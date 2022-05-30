import { Component } from 'react';

/**
 * ToDo List App
 * This is a to do list app with various functionalities:
 * 1. You can add an task
 * 2. Mark a task as done or undone
 * 3. It has a counter indicating how many tasks are remaining
 *    undone after marked done/undone/added a new task.
 *
 * Todo List Item format:
 * items: [
 *    {
 *      id: Number,
 *      title: String,
 *      done: Boolean (fasle by default)
 *    },
 * ]
 */

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // Array to temporariry store the todo list items
      todo: '',
      count: 0,
    };
  }

  // This updates the counter everytime there is a change
  // on the dom to indicate how many tasks remaining undone
  componentDidUpdate() {
    const { items, count } = this.state;
    let counter = 0,
      newArr = [],
      i = 0;
    if (items.length === 0) return counter;
    while (i <= items.length) {
      if (!items[i]?.done) {
        newArr.push(items[i]);
      }
      i++;
    }
    counter = newArr.length > 0 ? newArr.length - 1 : counter;
    if (counter !== count)
      this.setState({
        count: counter,
      });
  }

  // Update todo state on input change
  handleChange = (e) => {
    this.setState({
      todo: e.target.value,
    });
  };

  // Add task to tasks array once add button is clicked.
  handleClick = () => {
    const { items, todo } = this.state;
    if (todo === '') return;
    const item = {
      id: items.length + 1,
      title: todo,
      done: false,
    };
    this.setState({
      items: [...items, item],
      todo: '',
    });
  };

  // Toggles state of the task at hand to either done or undone.
  markDone = (e) => {
    e.preventDefault();
    const itemId = e.target.id;
    this.setState((prevState) => ({
      items: prevState.items.map((el) =>
        Number(el.id) === Number(itemId) ? { ...el, done: !el.done } : el,
      ),
    }));
  };

  render() {
    const { todo, items, count } = this.state;
    return (
      <div className="flex flex-col justify-start items-center w-full p-10 bg-gray-900 min-h-screen min-w-screen">
        <h1 className="text-gray-200 text-3xl font-bold underline mb-2">
          Todo List
        </h1>
        <p className="text-gray-200 mb-8 italic">
          <span className="font-bold">{count}</span> items of{' '}
          <span className="font-bold">{items.length}</span> left
        </p>
        <ul className="grid grid-cols-5 gap-4 w-full max-w-screen-sm mb-8">
          {items.map((item) => (
            // Add each item to a list component
            <li
              key={item.id}
              className={`col-start-2 col-span-3 rounded-lg bg-gray-800 p-4 text-xl text-center text-gray-500 ${
                item.done ? 'font-light line-through italic' : 'font-semibold'
              }`}
              value={item.id}
              id={item.id}
              onClick={this.markDone}>
              {item.title}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-5 gap-4 justify-between w-full max-w-screen-sm mb-4">
          <input
            className="col-start-2 col-span-2 bg-transparent border border-gray-600 rounded-lg p-2 text-base text-gray-200"
            type="text"
            value={todo}
            onChange={this.handleChange}
          />
          <button
            className="bg-purple-200 rounded-lg text-gray-900 font-bold"
            type="button"
            onClick={this.handleClick}>
            Add
          </button>
        </div>
      </div>
    );
  }
}
