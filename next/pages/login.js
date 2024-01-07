import Link from "next/link";
import React, { useState } from "react";
import Router from "next/router";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

const toggleMachine = Machine({
  id: "toggle",
  initial: "loggedOut",
  states: {
    loggedOut: {
      on: { TOGGLE: "loggedIn" },
    },
    loggedIn: {
      on: { TOGGLE: "loggedOut" },
    },
  },
});

const login = () => {
  const [csrfToken, setscrf] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, send] = useMachine(toggleMachine);

  React.useEffect(() => {
    fetch("http://localhost:8000/account/csrf/", {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
        setscrf(csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8000/account/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Connecting problem");
        }
      })
      .then((data) => {
        console.log(data);
        send("TOGGLE");
        // Router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setError("Username or password Incorrect");
      });
  }
  console.log(state.value);

  return (
    <>
      <div className="w-full lg:h-full ">
        <div className="max-w-[1240px] mx-auto py-[100px] p-2">
          <div className="grid md:grid-cols-6 gap-8">
            <div className="md:col-start-2 md:col-span-4 rounded-xls">
              <div className="mx-auto justify-center items-center w-full">
                <p className="text-red-500 text-center text-sm">{error}</p>
                <h2 className="text-lg font-medium mb-4 text-center">Signin</h2>
                <form
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-lg"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="w-full border border-gray-400 p-2 rounded-lg"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username*"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full border border-gray-400 p-2 rounded-lg"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password*"
                      required
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="md:w-1/3"></div>
                    <label className="md:w-2/3 block text-white font-bold">
                      <input className="mr-2 leading-normal" type="checkbox" />
                      <span className="text-sm">Remember me</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-white py-2 px-10 rounded-lg text-center hover:bg-indigo-600 hover:text-white"
                  >
                    Login
                  </button>
                </form>
                <div className="justify-between flex py-4 text-blue-500">
                  <div>
                    <Link href={"/"}>Forgot password?</Link>
                  </div>
                  <div>
                    <Link href={"/"}>Don't have an account? Sign up</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
