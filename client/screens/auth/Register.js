import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Form/InputBox";

const Register = ({ navigation }) => {
  const loginImage = "https://fishcopfed.coop/images/login.png";
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");

  // login function
  const handleRegister = async () => {
    const URL = "http://172.19.100.180:4000/api/v1/user/register";
    if (!email || !password || !name || !address || !city || !contact) {
      return alert("Please provide all fields");
    } else {
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          address: address,
          city: city,
          contact: contact,
        }),
      })
        .then((res) => {
          if (res.status === 404) {
            console.log("not found");
          } else
            res.json().then((data) => {
              console.log("DATA:", data);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: loginImage }} style={styles.image} />

      <InputBox
        placeholder={"Enter You Name"}
        value={name}
        setValue={setName}
        autoComplete={"name"}
      />
      <InputBox
        placeholder={"Enter You Email"}
        value={email}
        setValue={setEamil}
        autoComplete={"email"}
      />
      <InputBox
        value={password}
        setValue={setPassword}
        placeholder={"Enter You Password"}
        secureTextEntry={true}
      />
      <InputBox
        placeholder={"Enter You address"}
        value={address}
        setValue={setAddress}
        autoComplete={"address-line1"}
      />
      <InputBox
        placeholder={"Enter You city"}
        value={city}
        setValue={setCity}
        autoComplete={"country"}
      />
      <InputBox
        placeholder={"Enter You contact no"}
        value={contact}
        setValue={setContact}
        autoComplete={"tel"}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
        <Text>
          Alredy a user please ?{"  "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("register")}
          >
            login !
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#000000",
    width: "80%",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    marginVertical: 20,
  },
  loginBtnText: {
    color: "#ffffff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 18,
  },
  link: {
    color: "red",
  },
});
export default Register;
