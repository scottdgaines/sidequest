import cleanData from './utilities';

const fetchData = async () => { 
    try {    
        const response = await fetch('https://www.boredapi.com/api/activity/');
        const data = await response.json();
        const activity = cleanData(data);
  
        if (!response.ok) {
          return;
        };
  
        return activity;
  
      } catch (error) {
           return error;
        };
    };
    // const response = await fetch('https://www.boredapi.com/api/activity/');
    // const data = await response.json();
    // const activity = cleanData(data);

    // return activity
  
  export default fetchData;