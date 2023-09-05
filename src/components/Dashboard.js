import { signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Pencil, Trash2, Check } from "lucide-react";
import { uid } from "uid";
import { onValue, ref, remove, set, update } from "firebase/database";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [renderTodo, setRenderTodo] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);
  const [tempUniqueId, setTempUniqueId] = useState("");

  //Hook to manage authentication state change and todos
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(database, auth.currentUser.uid + "/"), (snapshot) => {
          setRenderTodo([]);
          const data = snapshot.val();
          if (data != null) {
            Object.values(data).map((todo) => {
              setRenderTodo((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/login");
      }
    });
  }, []);

  // Function for handling logout
  const handleLogut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //Function to add a new todo
  const addTodo = () => {
    const uniqueId = uid();
    const databasePath = auth.currentUser.uid + "/" + uniqueId;
    set(ref(database, databasePath), {
      todo: todo,
      uniqueId: uniqueId,
    });
    setTodo("");
  };

  //Functions to update todo
  const updateTodo = (todo) => {
    setEnableEdit(true);
    setTodo(todo.todo);
    setTempUniqueId(todo.uniqueId);
  };

  const confirmUpdateTodo = () => {
    const updatePath = auth.currentUser.uid + "/" + tempUniqueId;
    update(ref(database, updatePath), {
      todo: todo,
      uniqueId: tempUniqueId,
    });
    setTodo("");
    setEnableEdit(false);
  };

  //Function to delete todo
  const deleteTodo = (deleteUniqueId) => {
    const deletePath = auth.currentUser.uid + "/" + deleteUniqueId;
    remove(ref(database, deletePath));
  };

  return (
    <div className="text-2xl w-[100%] font-jetbrains">
      <nav className="flex flex-row justify-between items-center mx-2 my-2">
        <div>
          <p className="text-4xl font-telma">Todo</p>
        </div>
        <div className="border-[1px] border-black rounded-[5px] bg-[#F42C04]">
          <button
            className="flex flex-row justify-center items-center mx-1 my-1"
            onClick={handleLogut}
          >
            Logout
            <LogOut className="mx-1" />
          </button>
          {/* <LogOut onClick={handleLogut} /> */}
        </div>
      </nav>
      <div className="flex flex-row justify-center items-center my-4">
        <div className="border-[1px] border-black rounded-[5px] mx-2">
          <input
            type="text"
            required
            className="focus:outline-none m-[5px]"
            placeholder="Enter something..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <div className="border-[1px] border-black rounded-[50%] mx-2 bg-[#b5e48c]">
          {enableEdit ? (
            <Check
              className="cursor-pointer w-[42px] h-[42px]"
              onClick={confirmUpdateTodo}
            />
          ) : (
            <Plus
              className="cursor-pointer w-[42px] h-[42px]"
              onClick={addTodo}
            />
          )}
        </div>
      </div>
      <div className="mx-10 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {renderTodo.map((todo) => (
          <div className="flex flex-col justify-between border-[1px] border-black rounded-[10px] bg-[#C77DFF]">
            <h3 className="m-2">{todo.todo}</h3>
            <div className="flex flex-row justify-between my-2">
              <Pencil
                className="cursor-pointer m-2"
                onClick={() => updateTodo(todo)}
              />
              <Trash2
                className="cursor-pointer m-2 text-[#F42C04]"
                onClick={() => deleteTodo(todo.uniqueId)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
