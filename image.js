const imageContainer = document.getElementById('image-container');
let page = 0;

const fetchImage = async () => {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=2&limit=100`);
        if(response.status !== 200){
            throw new Error('Cannot fetch the data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('rejected:', error.message);
    }
};

const updateImage = (data) => {
    if(data){
        const div = document.createElement('div');
        const image = document.createElement('img');
        image.src = data.download_url;
        image.alt = data.author;

        div.appendChild(image);
        imageContainer.appendChild(div);
    }
};

const displayArrayData = (arr) => {
    arr.forEach(item => {
        updateImage(item);
    });
};

fetchImage()
    .then(data => {
        if (data) {
            displayArrayData(data);
        }else{
            alert('Failed to fetch image. Please check your internet connection.')
        }
    })
    .catch(err => console.log('rejected:', err.message));


