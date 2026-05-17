# Backend

## Sample MongoDB Schemas

User:

```js
{
  name: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
}
```

Task:

```js
{
  user: ObjectId,
  title: String,
  description: String,
  status: "pending" | "in-progress" | "completed",
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```
