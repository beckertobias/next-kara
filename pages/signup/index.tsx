import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import OptionsToggler from '../../components/option-toggler/OptionToggler';
import { Layout } from '../../containers/layout';
import { Button } from '../../components/buttons';
import InputField from '../../components/input-field/InputField';
import text from '../../lib/text';
import { useEffect, useState } from 'react';
import { SupportedLanguage, UserInput, UserType } from '../../lib/types';
import { useMutation, gql } from '@apollo/react-hooks';
import styles from './Signup.module.css';
import { currentLanguageVar } from '../../apollo/client';

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      id
    }
  }
`;

const SignUpPage = (): React.ReactElement => {
  const [formValues, setFormValues] = useState<UserInput>({
    name: {
      lastName: '',
    },
    email: '',
    password: '',
    type: 'TALENT',
  });
  const [passwordsIdentical, setPasswordsIdentical] = useState(true);
  const [createUser, newUser] = useMutation(ADD_USER);
  const currentText = text['GERMAN'];

  useEffect(() => {
    console.log(currentLanguageVar());
  });

  const company =
    formValues.type === 'TALENT' ? null : (
      <InputField
        id="company"
        label={currentText.companyName}
        setValue={setFormValues}
        required
      />
    );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    // const newUser = {
    //   name: formValues.name,
    //   email: formValues.email,
    //   password: formValues.password,
    //   type: formValues.type,
    // };
    // if (formValues.company) newUser.company = formValues.company;
    console.log(formValues);
    try {
      await createUser({
        variables: {
          input: formValues,
        },
      });
    } catch (e) {
      console.error('user already exists: ', e.message);
    }
  };

  useEffect(() => {
    if (newUser.data) {
      console.log('new User:', newUser);
    }
  }, [newUser]);

  return (
    <Layout title="sign up">
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h2">
              {currentText.pages.signup.header}
            </Typography>
            <form onSubmit={handleSubmit}>
              <OptionsToggler
                options={[
                  { value: 'TALENT', display: currentText.type.talent },
                  { value: 'EMPLOYER', display: currentText.type.employer },
                ]}
                optionsLabel="type"
                setOption={(type) => {
                  setFormValues((oldValues) => ({
                    ...oldValues,
                    type: type as UserType,
                  }));
                }}
              />
              <Box component="div">
                <InputField
                  id="firstName"
                  nesting="name"
                  label={currentText.fullName.firstName}
                  fullWidth={false}
                  setValue={setFormValues}
                />
                <InputField
                  id="lastName"
                  nesting="name"
                  label={currentText.fullName.lastName}
                  fullWidth={false}
                  setValue={setFormValues}
                  required
                />
              </Box>
              {company}
              <InputField
                id="email"
                type="email"
                label={currentText.email}
                setValue={setFormValues}
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                id="password"
                label={currentText.password}
                setValue={setFormValues}
                type="password"
                required
              />
              <InputField
                id="passwordConfirm"
                label={currentText.repeatPassword}
                onChange={(e) =>
                  setPasswordsIdentical(e.target.value === formValues.password)
                }
                type="password"
                required
                inputProps={{
                  className: styles.FormInput,
                  pattern: `^${formValues.password}$`,
                }}
              />
              <Button disabled={!passwordsIdentical} type="submit">
                {currentText.signUp}
              </Button>
            </form>
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SignUpPage;
