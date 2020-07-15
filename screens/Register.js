import React from "react";
import { Alert, Text, TextInput, View, StyleSheet, Button } from "react-native";
import useForm from "../hooks/useForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293241",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  title: {
    color: "#EF6643",
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderColor: "#E0FBFC",
    borderWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
});

export default ({ navigation }) => {
  const initialState = {
    email: "",
    Passaword: "",
  };
  const onSubmit = (values) => {
    fetch("https://serveless.elyelin.vercel.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(values),
    })
      .then((x) => x.text())
      .then((x) => {
        if (x === "Usuario creado con éxito") {
          return Alert.alert("Exito", x, [
            {
              text: "Ir al inicio",
              onPress: () => navigation.navigate("Login"),
            },
          ]);
        }
        Alert.alert("Error", x);
      });
  };

  const { subscribe, handleSubmit, inputs } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        autoCapitalize="none"
        value={inputs.email}
        onChangeText={subscribe("email")}
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        autoCapitalize="none"
        value={inputs.password}
        onChangeText={subscribe("password")}
        style={styles.input}
        placeholder="Passaword"
        secureTextEntry={true}
      />
      <Button color="#EF6643" title="Enviar" onPress={handleSubmit} />
      <Button
        color="#EF6643"
        title="Volver al inicio"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};
