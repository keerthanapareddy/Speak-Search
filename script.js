// to run a simple server, cd in your terminal to the folder these files are in and run:
// python -m SimpleHTTPServer 8007
// then go to http://localhost:8007 in your browser

const SpeechRecognition = webkitSpeechRecognition;
// const giphyAPIKey = '8sWCLR2yFPpxmByinU9WPTT6E5yINlMe';
const apiKey = 'f01b0b516e6843ea9793bd4deed11c40';

const getSpeech = () => {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  // recognition.continuous = false;
  recognition.interimResults = true;
  console.log('started rec');

  recognition.onresult = event => {
    const speechResult = event.results[0][0].transcript;
    console.log('result: ' + speechResult);
    console.log('confidence: ' + event.results[0][0].confidence);
    document.querySelector('#speech-div').textContent = speechResult;
    getGif(speechResult);
  };

  recognition.onend = () => {
    console.log('it is over');

    // for "endless" mode, comment out the next line and uncomment getSpeech()
    recognition.stop();
    // getSpeech();

  };

  recognition.onerror = event => {
    console.log('something went wrong: ' + event.error);
  };
};

const getGif = phrase => {
  // let url = `http://api.giphy.com/v1/gifs/random?api_key=${giphyAPIKey}&tag=${phrase}`;
  let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}&tag=${phrase}`;

  console.log(url);

  fetch(url, {
    mode: 'cors'
  })
    .then(response => response.json())
    .then(result => {
      let titleUrl = result.articles[0].title;
      console.log(titleUrl);
      document.querySelector('#image-div').textContent = titleUrl;
      // let titleUrl = result.data.image_url;
      // document.querySelector('#the-gif').src = titleUrl;
    });
};

document.querySelector('#my-button').onclick = () => {
  console.log('clickity');
  getSpeech();
};
