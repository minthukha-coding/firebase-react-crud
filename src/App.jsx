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
import Swal from "sweetalert2";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    Swal.fire({
      title: "Success",
      text: "Creating user Success",
      icon: "success"
    });
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    Swal.fire({
      title: "Success",
      text: "Increase user age",
      icon: "success"
    });
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        const userDoc = doc(db, "users", id);
        deleteDoc(userDoc);
      }
    });

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
