// import() doesn't care about whether a module is an async module or not
const UserApi = import("./UserApi.js");

export const CreateUserAction = async name => {
	// These are normal awaits, because they are in an async function
	const { createUser } = await UserApi;
	await createUser(name);
};

// You can place import() where you like
// Placing it at top-level will start loading and evaluating on
//   module evaluation.
//   see CreateUserAction above
//   Here: Connecting to the DB starts when the application starts
// Placing it inside of an (async) function will start loading
//   and evaluating when the function is called for the first time
//   which basically makes it lazy-loaded.
//   see AlternativeCreateUserAction below
//   Here: Connecting to the DB starts when AlternativeCreateUserAction
//         is called
export const AlternativeCreateUserAction = async name => {
	const { createUser } = await import("./UserApi.js");
	await createUser(name);
};

// Note: Using await import() at top-level doesn't make much sense
//       except in rare cases. It will import modules sequentially.
