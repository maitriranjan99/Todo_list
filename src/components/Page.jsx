import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [complete, setComplete] = useState(false);
  const [lists, setLists] = useState([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = () => {
    if (name !== "" && title !== "") {
      let payload = { name, title, complete };
      axios.post("http://localhost:3000/todos", payload);
      setName("");
      setTitle("");
    }
  };

  const updateHandler = (id) => {
    let payload = { name, title, complete };
    axios.put(`http://localhost:3000/todos/${id}`, payload);
    setName("");
    setTitle("");
  };

  const edit = (id) => {
    let editTodo = lists.find((i) => i.id === id);
    setName(editTodo.name);
    setTitle(editTodo.title);
    setEditId(id);
  };

  const task = async (id) => {
    let { data } = await axios.get(`http://localhost:3000/todos/${id}`);
    let { name, title } = data;
    setComplete(true);
    let payload = { name, title, complete };
    axios.put(`http://localhost:3000/todos/${id}`, payload);
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        console.log("deleted successfully");
      })
      .catch(() => {
        console.log("error");
      });
  };
  return (
    <>
      <form className="flex items-center justify-center bg-slate-500">
        <input
          type="text"
          placeholder="Enter task name"
          className="outline-none m-5 p-1"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter title"
          className="outline-none p-1 m-5"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {editId ? (
          <button
            className="bg-green-600 py-1 px-0 m-5 w-40 text-white"
            onClick={() => updateHandler(editId)}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-blue-600 py-1 px-0 m-5 w-40 text-white"
            onClick={submitHandler}
          >
            Add Task
          </button>
        )}
      </form>
      <div className="flex justify-center">
        <table className="table-auto">
          <thead className="border-b-2 bg-gray-600">
            <tr>
              <th className="p-3 text-sm tracking-wide font-semibold text-white">
                Id
              </th>
              <th className="p-3 text-sm tracking-wide font-semibold text-white">
                Title
              </th>
              <th className="p-3 text-sm tracking-wide font-semibold text-white">
                Task
              </th>
              <th className="p-3 text-sm tracking-wide font-semibold text-white">
                Action
              </th>
            </tr>
          </thead>
          {lists.length > 0 ? (
            <tbody className="border-b-2">
              {lists.map((item, index) => {
                return item.id % 2 !== 0 ? (
                  <tr key={index}>
                    <td className="p-3 text-sm tracking-wide">{item.id}</td>
                    <td className="p-3 text-sm tracking-wide">{item.title}</td>
                    <td className="p-3 text-sm tracking-wide">
                      {item.complete ? (
                        <button className="bg-green-700 text-white w-32 py-1">
                          Completed
                        </button>
                      ) : (
                        <button
                          className="bg-red-600 text-white w-32 py-1"
                          onClick={() => task(item.id)}
                        >
                          Not completed
                        </button>
                      )}
                    </td>
                    <td className="p-3 text-sm tracking-wide font-semibold text-white">
                      <button
                        className="bg-green-700 w-20 mx-2 py-1"
                        onClick={() => edit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600  w-20 mx-2 py-1"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td className="p-3 text-sm tracking-wide bg-gray-300 font-bold">
                      {item.id}
                    </td>
                    <td className="p-3 text-sm tracking-wide bg-gray-300 font-bold">
                      {item.title}
                    </td>
                    <td className="p-3 text-sm tracking-wide bg-gray-300 text-white">
                      {item.complete ? (
                        <button className="bg-green-700  w-32 py-1">
                          Completed
                        </button>
                      ) : (
                        <button
                          className="bg-red-600 w-32 py-1"
                          onClick={() => task(item.id)}
                        >
                          Not completed
                        </button>
                      )}
                    </td>
                    <td className="p-3 text-sm tracking-wide font-semibold bg-gray-300 text-white">
                      <button
                        className="bg-green-700  w-20 mx-2 py-1"
                        onClick={() => edit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 w-20 mx-2 py-1"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div className="text-red-600 font-bold">No Task Available</div>
          )}
        </table>
      </div>
    </>
  );
};

export default Page;
