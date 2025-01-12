import { useEffect, useState } from 'react';
import OpenAI from 'openai';

function App() {
	const [completion, setCompletion] = useState('');

	// const openai = new OpenAI({
	// 	apiKey: 'key',
	// 	dangerouslyAllowBrowser: true,
	// });

	useEffect(() => {
		async function fetchData() {
			// setCompletion(
			// 	(
			// 		await openai.chat.completions.create({
			// 			model: 'gpt-4o-mini',
			// 			messages: [
			// 				{ role: 'system', content: 'You are a helpful assistant.' },
			// 				{
			// 					role: 'user',
			// 					content: 'How to use decorators in python?',
			// 				},
			// 			],
			// 		})
			// 	).choices[0].message.content ?? ''
			// );
			setCompletion(`In Python, decorators are a powerful tool that allows you to modify the behavior of a function or a method. They are often used to add functionality to existing functions in a clean and readable way. Here's how you can use decorators in Python.

### Creating a Basic Decorator

A decorator is typically defined as a function that takes another function as an argument and returns a new function that enhances or modifies the original function.

Here's a simple example of a decorator that prints a message before and after the execution of a function:

\`\`\`python
def my_decorator(func):
def wrapper():
print("Something is happening before the function is called.")
func()
print("Something is happening after the function is called.")
return wrapper

@my_decorator
def say_hello():
print("Hello!")

# Calling the decorated function
say_hello()
\`\`\`

### Output
\`\`\`
Something is happening before the function is called.
Hello!
Something is happening after the function is called.
\`\`\`

### Explanation
1. **Defining the Decorator**: \`my_decorator\` takes a function (\`func\`) as an argument and defines a nested function \`wrapper\`, which adds functionality before and after calling \`func\`.
2. **Using the Decorator**: The \`@my_decorator\` syntax is syntactic sugar for \`say_hello = my_decorator(say_hello)\`. It applies the decorator to the \`say_hello\` function.
3. **Calling the Decorated Function**: When \`say_hello()\` is called, it actually calls the \`wrapper()\` function defined inside the decorator.

### Decorating Functions with Arguments

If your function accepts arguments, you can modify the \`wrapper\` function to accept those arguments as well by using \`*args\` and \`**kwargs\`:

\`\`\`python
def my_decorator(func):
def wrapper(*args, **kwargs):
print("Something is happening before the function is called.")
result = func(*args, **kwargs)
print("Something is happening after the function is called.")
return result
return wrapper

@my_decorator
def say_hello(name):
print(f"Hello, {name}!")

# Calling the decorated function with an argument
say_hello("Alice")
\`\`\`

### Output
\`\`\`
Something is happening before the function is called.
Hello, Alice!
Something is happening after the function is called.
\`\`\`

### Using Built-in Decorators

Python includes several built-in decorators such as \`@staticmethod\`, \`@classmethod\`, and \`@property\`, which have specific purposes in classes. Here's a brief example:

\`\`\`python
class MyClass:
@classmethod
def my_class_method(cls):
print(f"This is a class method of {cls}.")

@staticmethod
def my_static_method():
print("This is a static method.")

MyClass.my_class_method() # Calls the class method
MyClass.my_static_method() # Calls the static method
\`\`\`

### Summary

- A decorator is a function that wraps another function to enhance or modify its behavior.
- You can create decorators that take arguments and also handle the original function’s arguments.
- You can use decorators in classes to define static methods and class methods.

Decorators are widely used in Python frameworks and libraries, such as Flask and Django, to implement functionality such as routing, middleware, and more.`);
		}

		fetchData();
	}, []);

	return (
		<main className='app dark:bg-slate-800 p-8 dark:text-white'>
			<h1 className='text-2xl font-bold text-center mb-4'>Chat-GPT</h1>
			<hr />
			<h2 className='text-lg mt-2'>Question:</h2>
			<div>How to use decorators in python?</div>
			<h2 className='text-lg mt-2'>Response:</h2>
			<div>{completion}</div>
		</main>
	);
}

export default App;
