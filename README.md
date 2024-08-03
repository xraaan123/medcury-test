# This is for MEDcury Co., Ltd. test interview.

### What I have done in this test

- Create CRUD for task
    - Create a new task.
    - Get all tasks and get a task by task ID.
    - Update task.
    - Delete task.

- Create register and login api for authenticate
    - When register complete it will store in User model.
    - When user are logged in it will return jwt token, and used token for CRUD task api.
    - If user call api directly without register or log in it will not return anything because those api are needed token to access.

> API are tested by Postman.
