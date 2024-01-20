import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollectionRef]);
  return (
    <div className="container">
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        className="form-control"
        placeholder="User Age"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button type="button" className="btn btn-primary" onClick={createUser}>
        Create User
      </button>

      {users.map((user) => {
        return (
          <div key={user.id}>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
              type="button"
              className="btn btn-success"
            >
              Increase Age
            </button>
            <button
              type="button"
              onClick={() => {
                deleteUser(user.id);
              }}
              className="btn btn-danger"
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
