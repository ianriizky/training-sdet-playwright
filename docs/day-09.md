# [2025-11-13] Day 9 - Exercise

- [x] Send a POST request to https://reqres.in/api/users with a new user's name and job.
  - [x] Verify that the response status is 201 and the response body contains the correct name.

- [x] Update an existing user at https://reqres.in/api/users/2 with new job info.
  - [x] Verify that the response status is 200 and the job field is updated correctly.

- [x] Send a GET request to https://reqres.in/api/users?page=2.
  - [x] Verify that the response status is 200 and the data array is not empty.

- [x] Use Faker to generate random user names and job titles.
  - [x] Send POST requests to create multiple users dynamically.
  - [x] Assert that each response returns status 201 and the correct generated name.
