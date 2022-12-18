import { useEffect, useState } from "react";

import { Configuration, OpenAIApi } from "openai";
import Grid from '@mui/material/Grid'; // Grid version 1

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card } from "@mui/material";
import { Badge } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';

import Typography from '@mui/material/Typography';
import Brand_AI from "../Header";


const ContractForm = ()=> {

  const [data, setData] = useState({
    inData: ""
  });
  const [response, setResponse] = useState("");
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [opt,setOpt] = useState("a Doctor's");
  
  const top5options = ["a Doctor's", "an Engineer's", "an Average person's", "a University Proffessor's", "a Marketing Executive's"]

  async function setter(article) 
  {

    const configuration = new Configuration({
        apiKey: "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", // my own api key
    });

  
  const openai = new OpenAIApi(configuration);
  
  let myprompt = "Assess the quality of the article below from 1 to 10, 1 being the lowest quality and 10 being the highest quality, for the list items below, from "+ opt +" perspective. Explain the weak and non-existing points in the article for each list item. Then, show the overall quality score for the article that will be the average of the quality points of each list item. Then, write the overall weak and non-existing points of the article: 1. Relevance to the topic at hand. 2. The level of detail provided in the article. 3. The accuracy and credibility of the information presented. 4. The writing style, including grammar and clarity. 5. The organization of the information and the logical flow of ideas. 6. The objectivity of the author and the presence of bias. 7. The presence of supporting evidence and sources. 8. The timeliness of the information. 9. The accessibility of the language used. 10. The potential impact and significance of the information presented. Article:"
  
  myprompt += article;
  
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:  myprompt,
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
    
    setResponse(response.data.choices[0]);
    setTokensUsed(response.data.usage.total_tokens);
    if (totalTokens === 0) {
      setTotalTokens(response.data.usage.total_tokens);
    } else {
      setTotalTokens(response.data.usage.total_tokens + totalTokens);
    }
  }


  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    setter(data)
  };

  const handleChange = (event) => {
    event.preventDefault();
    setData(event.target.value);
  }

  const handleChangeCombo = (event,value) =>{
    event.preventDefault();
    setOpt(value);
  }


  useEffect(() =>{
  },[response])
  
  
  return (

    <div className="form-container">
      <form onSubmit={handleSubmit} onChange={handleChange}> 
        <div>
          <Brand_AI></Brand_AI>
          <p className="explainer">This program will calculate the quality of your article and what your article is missing in terms of content, according to the audience you choose below. We plan on adding new audiences soon.</p>
          
          <p className="explainer">We use a well-trained and progressed version of the OpenAI's davinci003 engine to produce the best results possible.</p>
        </div>

        <h3 style={{ marginBottom: "0.5%", marginTop: "1%"}}>Your Content</h3>
          <OutlinedInput type="text"
              name="name"
              value={data.inData}
              style={{width: "100%" ,backgroundColor:"white"}}
              id="outlined-multiline"
              multiline
              rows={12}/>   
        
        <Grid style={{ marginTop:"2%", width:"100%", justifyContent:"space-between",alignItems:"center", paddingLeft:"10%",paddingRight:"10%"}} className="flexBoxFix" container spacing={2}>
          <Grid xs={5} >
            <Autocomplete
            
              style={{width:"100%",backgroundColor:"white"}}
              id="combo-box-demo"
              options={top5options}
              onChange={handleChangeCombo}
              renderInput={(params) =>  <TextField {...params} label="Perspective Options" />}
            />
          </Grid>
          <Grid xs={5}>
            <Button style={{width:"100%", backgroundColor:"black"}} variant="contained" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
            
      </form>

      <h3 style={{ marginBottom: "0.5%", marginTop: "2%"}}>Feedback</h3>
      <TextField inputProps={
					{ readOnly: true}
				}  style={{width: "100%", backgroundColor:"white"}} id="outlined-multiline2"
            multiline
            variant="outlined" rows={12} value={response.text}>
      </TextField>

      <div style={{
        display: "flex",
        flexDirection:"column",
        alignItems: "start",
        justifyContent: "start",
        marginTop: "3%",
        marginBottom: "5%",
      }}>

{/*
        <h3 className="form-creator">Pricing data </h3>
        <p className="explainer">You can see your usage data here, since this is a proof of concept, you can see all models and what they would cost even though we are using davinci003</p>
        
        <div className="bottomFormTotal">
        <Card className="bottomFormCard" sx={{ maxWidth: 400 }} >
          <p className="explainer2">Davinci</p>
          
          <p className="explainer3">Tokens Used: {tokensUsed}</p>
          <p className="explainer3">Total Tokens Used in Session: {totalTokens}</p>
          <p className="explainer3">Price in USD for the entire session: {totalTokens * 0.00002}$USD </p>
        </Card>
        <Card className="bottomFormCard" sx={{ maxWidth: 400 }}>
        <p className="explainer2">Ada</p>
          <p className="explainer3">Tokens Used: {tokensUsed}</p>
          <p className="explainer3">Total Tokens Used in Session: {totalTokens}</p>
          <p className="explainer3">Price in USD for the entire session: {totalTokens * 0.0000004}$USD </p>
        </Card>
        <Card className="bottomFormCard" sx={{ maxWidth: 400 }}>
        <p className="explainer2">Babbage</p>
          <p className="explainer3">Tokens Used: {tokensUsed}</p>
          <p className="explainer3">Total Tokens Used in Session: {totalTokens}</p>
          <p className="explainer3">Price in USD for the entire session: {totalTokens * 0.0000005}$USD </p>
        </Card>
        <Card className="bottomFormCard" sx={{ maxWidth: 400 }}>
        <p className="explainer2">Curie</p>
          <p className="explainer3">Tokens Used: {tokensUsed}</p>
          <p className="explainer3">Total Tokens Used in Session: {totalTokens}</p>
          <p className="explainer3">Price in USD for the entire session: {totalTokens * 0.000002}$USD </p>
        </Card>
      </div>
    */}

      </div>
    </div>
  );
}
export default ContractForm