import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import "../css/login.css"; // Importar el archivo CSS

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCW04t59Aplq9lIXZrOiSw0O7eWG8A98j8",
  authDomain: "login-d8396.firebaseapp.com",
  projectId: "login-d8396",
  storageBucket: "login-d8396.firebasestorage.app",
  messagingSenderId: "748421409173",
  appId: "1:748421409173:web:751ffe8262247f05a6ae9c",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const SignIn: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user: User = result.user;
      console.log("Usuario autenticado con Google:", user);

      // Guardar datos del usuario en Firestore si no existe
      const userDoc = doc(db, "users", user.uid);
      await setDoc(
        userDoc,
        {
          nombre: user.displayName || "Usuario Google",
          correo: user.email,
          contraseña: null, // No almacenamos contraseña para usuarios autenticados con Google
          miLista: null, // Array vacío
        },
        { merge: true }
      ); // Usar merge para no sobrescribir si ya existe
      setError(null); // Limpiar error después de autenticación exitosa
    } catch (error: any) {
      console.error("Error durante la autenticación con Google:", error);
      setError("Error durante la autenticación con Google"); // Guardar el mensaje de error
    }
  };

  const handleSignUpWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: User = userCredential.user;
      console.log("Usuario registrado con email:", user);

      // Guardar datos del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nombre: name,
        correo: email,
        contraseña: password, // NOTA: No es seguro guardar contraseñas en texto plano. Esta es solo una demostración.
        miLista: [], // Array vacío
      });
      setError(null); // Limpiar error después de registro exitoso
    } catch (error: any) {
      console.error("Error durante el registro con email:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo electrónico ya está en uso.");
      } else if (error.code === "auth/invalid-email") {
        setError("El correo electrónico no es válido.");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil.");
      } else {
        setError("Error durante el registro con email.");
      }
    }
  };

  const handleSignInWithEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: User = userCredential.user;
      console.log("Usuario autenticado con email:", user);
      setError(null); // Limpiar error después de autenticación exitosa
    } catch (error: any) {
      console.error("Error durante la autenticación con email:", error);
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else if (error.code === "auth/invalid-email") {
        setError("El correo electrónico no es válido.");
      } else {
        setError("Error durante la autenticación con email.");
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      <button onClick={handleSignInWithGoogle}>
        Iniciar sesión con Google
      </button>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button onClick={handleSignUpWithEmail}>Crear una cuenta</button>
        <button onClick={handleSignInWithEmail}>
          Iniciar sesión con la cuenta
        </button>
      </div>
    </div>
  );
};

export default SignIn;
