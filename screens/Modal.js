import React from "react";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import useFetch from "../hooks/useFetch";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293241",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    color: "#EE6C4D",
  },
});

export default ({ navigation }) => {
  const id = navigation.getParam("_id");
  const { loading, data } = useFetch(
    `https://serveless.elyelin.vercel.app/api/meals/${id}`
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <Text style={styles.text}>{data._id}</Text>
          <Text style={styles.text}>{data.name}</Text>
          <Text style={styles.text}>{data.desc}</Text>
          <Button
            title="Aceptar"
            onPress={() => {
              AsyncStorage.getItem("token").then((x) => {
                if (x) {
                  fetch("https://serveless.elyelin.vercel.app/api/orders", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      authorization: x,
                    },
                    body: JSON.stringify({
                      meal_id: id,
                    }),
                  }).then((x) => {
                    console.log(x.status);
                    if (x.status !== 201) {
                      return alert("La orden no pudo ser generada");
                    }
                    alert("Orden generada exitosamente");
                    navigation.navigate("Meals");
                  });
                }
              });
            }}
          />
          <Button
            title="Cancelar"
            onPress={() => navigation.navigate("Meals")}
          />
        </>
      )}
    </View>
  );
};
