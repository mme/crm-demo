import { Contact } from "@/types/contact";
import { useState } from "react";
import { EditableNameField } from "./EditableNameFields";
import { EditableField } from "./EditableField";
import { CallIcon, EmailIcon, MeetingIcon, TaskIcon, TrashIcon } from "./Icons";

interface ContactDetailProps {
  contact: Contact;
  onUpdateContact: (contact: Contact) => void;
}

export const ContactDetail: React.FC<ContactDetailProps> = ({
  contact,
  onUpdateContact,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onUpdateContact({ ...contact, [name]: value });
  };

  const handleDoneClick = () => {
    setIsEditing(false);
  };

  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [newTodoType, setNewTodoType] = useState<Todo["type"]>("call");
  const handleAddTodo = () => {
    const newTodo: Todo = {
      type: newTodoType,
      description: newTodoDescription,
      done: false,
    };
    onUpdateContact({
      ...contact,
      todos: [...contact.todos, newTodo],
    });
    setNewTodoDescription("");
    setNewTodoType("call");
  };

  return (
    <div className="p-6">
      <div className="flex items-start space-x-6">
        <img
          src={contact.pic}
          alt="Contact"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <EditableNameField
              isEditing={isEditing}
              value={contact.name}
              handleInputChange={handleInputChange}
              setIsEditing={setIsEditing}
            />
            {isEditing ? (
              <button
                onClick={handleDoneClick}
                className="bg-black hover:bg-gray-800 text-sm text-white font-medium py-2 px-4 rounded mt-4"
              >
                Done
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-black hover:bg-gray-800 text-sm text-white font-medium py-2 px-4 rounded mt-4"
              >
                Edit contact
              </button>
            )}
          </div>
          <div className="mt-3">
            <EditableField
              label="Email"
              value={contact.email}
              name="email"
              isEditing={isEditing}
              onInputChange={handleInputChange}
              setIsEditing={setIsEditing}
            />
            <EditableField
              label="Phone"
              value={contact.phone}
              name="phone"
              isEditing={isEditing}
              onInputChange={handleInputChange}
              setIsEditing={setIsEditing}
            />
            <p className="text-gray-600 mt-2">
              <strong>Notes</strong>
              <br />
              {contact.notes}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold">Todos</h3>
        {contact.todos.length > 0 ? (
          contact.todos.map((todo, index) => (
            <div key={index} className="mt-2 text-sm items-center flex group">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={(e) => {
                  onUpdateContact({
                    ...contact,
                    todos: contact.todos.map((t, i) =>
                      i === index ? { ...t, done: e.target.checked } : t
                    ),
                  });
                }}
                className="mr-2"
              />
              <div className={`font-semibold w-7 inline-block`}>
                {iconForTodoType(todo.type)}{" "}
              </div>
              <div className={`${todo.done ? "line-through" : ""}`}>
                {todo.description}
              </div>
              <div
                className="text-red-500 ml-2 cursor-pointer hidden group-hover:inline-block"
                onClick={() => {
                  onUpdateContact({
                    ...contact,
                    todos: contact.todos.filter((t, i) => i !== index),
                  });
                }}
              >
                {TrashIcon}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-2">No todos available.</p>
        )}
      </div>
      <div className="flex mt-4">
        {/* Optionally, include a dropdown or buttons here to select the type of the new todo */}
        <select
          value={newTodoType}
          onChange={(e) => setNewTodoType(e.target.value as Todo["type"])}
          className="mr-2 p-0.5 border rounded text-xs"
        >
          <option value="call">Call</option>
          <option value="meeting">Meeting</option>
          <option value="task">Task</option>
          <option value="email">Email</option>
        </select>
        <input
          type="text"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          placeholder="Add new todo"
          className="mr-2 p-1 border rounded text-xs"
        />
        <button
          onClick={handleAddTodo}
          className="bg-black hover:bg-gray-800 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
};

function iconForTodoType(type: string) {
  switch (type) {
    case "call":
      return CallIcon;
    case "email":
      return EmailIcon;
    case "meeting":
      return MeetingIcon;
    case "task":
      return TaskIcon;
  }
  return null;
}
