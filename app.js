// Define the CRUD API URL
const apiUrl = 'https://crudcrud.com/api/175fd45e5d76430ea9a0c3f2de262de0/appointment';

// Function to fetch and display data

document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Send data to the API
    async function Post() {
        try {
            let res = await axios.post(apiUrl, formDataObject);
            console.log(res)
            // Clear the form
            e.target.reset();

            // Call fetchData function for display data
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }
    Post();

    async function fetchData() {
        try {
            let response = await axios.get(apiUrl)
            const dataList = document.getElementById('dataList');
            dataList.innerHTML = ''; // Clear previous data

            response.data.forEach((item, index) => {
                const listItem = document.createElement('div');
                listItem.classList.add('alert', 'alert-primary', 'mt-2');
                listItem.innerHTML = `
                    <p><strong>Name:</strong> ${item.name}</p>
                    <p><strong>Email:</strong> ${item.email}</p>
                    <p><strong>Phone:</strong> ${item.phone}</p>
                    <button class="btn btn-warning edit-button" data-id="${item._id}">Edit</button>
                    <button class="btn btn-danger delete-button" data-id="${item._id}">Delete</button>
                `;
                dataList.appendChild(listItem);
            });
        } catch (error) {
            console.log(error)
        }
    }


    // Initial data fetch and display
    fetchData();

    // Function to update data
    async function updateData(dataId, updatedData) {
        try {
            const editUrl = `${apiUrl}/${dataId}`; // Construct the update URL

            // Send the update request
            let res = await axios.put(editUrl, updatedData);

            // Fetch and display updated data   
            fetchData();


        } catch (error) {
            console.log(error)
        }
    }

    // Event delegation for edit and delete buttons
    document.getElementById('dataList').addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-button')) {
            const dataId = e.target.getAttribute('data-id');

            try {
                // Fetch the existing data for editing
                let response = await axios.get(`${apiUrl}/${dataId}`)
                const existingData = response.data;

                // Prompt the user for updated data with existing data as placeholders
                const updatedData = {
                    name: prompt('Enter updated name:', existingData.name),
                    email: prompt('Enter updated email:', existingData.email),
                    phone: prompt('Enter updated phone:', existingData.phone),
                };

                if (updatedData.name !== null && updatedData.email !== null && updatedData.phone !== null) {
                    updateData(dataId, updatedData);
                }

            } catch (error) {
                console.log(error)
            }

        } else if (e.target.classList.contains('delete-button')) {
            try {
                // Handle delete button click
                const dataId = e.target.getAttribute('data-id');
                const deleteUrl = `${apiUrl}/${dataId}`; // Construct the delete URL

                // Send a DELETE request to remove the data

                await axios.delete(deleteUrl)

                // Fetch and display updated data after deletion
                fetchData();


            } catch (error) {
                console.log(error)
            }
        }
    })
})