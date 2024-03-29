import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Brand_AI from "../Header.tsx";
import styled from "@emotion/styled";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import { Audio } from 'react-loader-spinner';
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/globals.css";

const { Configuration, OpenAIApi } = require("openai");

const ContentGenerator = ()=> {

  const [data, setData] = useState({
    inData: ""
  });
  const [data2, setData2] = useState({
    inData: ""
  });
  const [response, setResponse] = useState(["Nothing yet","Nothing yet","Nothing yet"]);
  const [loading ,setLoading] =useState(true);
  const [open, setOpen] = useState(false);
  const [imgUrlList, setImgUrlList] = useState([])
  const [rowNum, setRowNum] = useState(1);
  const [innerHeightOfPage, setInnerHeight] = useState();
  const listOfWords = ["Attention","Interest","Desire","Action"]
  useEffect(() => {
    
    const {innerWidth, innerHeight} = window;
    setRowNum(innerHeight / 75);
    setInnerHeight(innerHeight)
  });
  const handleClose = () => {setOpen(false)}

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const CssTextField = styled(TextField, {
    shouldForwardProp: (props) => props !== "focuscolor"
  })((p) => ({
    // input label when focused
    "& label.Mui-focused": {
      color: p.focusColor
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: p.focusColor
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: p.focusColor
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: p.focusColor
      }
    }
  }));
  async function setter(article,article2) 
  {
    setLoading(true);
    setOpen(true);


  const configuration = new Configuration({
    //TODO not secure
  apiKey: "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",
  });
  
  const openai = new OpenAIApi(configuration);
  console.log(article)
  console.log(article2);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "From this description of a company:\n\n"+article+"\n\nGenerate 3 prompts for dall-e that can generate an image that is related to this description, dont use the company name in your prompt since dall-e is not good with words, the formatting must be as such: [\"dall-e prompt\",\"dall-e prompt\",\"dall-e prompt\"]\n OUTPUT:",
    temperature: 0.8,
    max_tokens: 1759,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.data.choices[0].text)
  var response2 = await openai.createImage({
    prompt: JSON.parse(response.data.choices[0].text)[0] + "Impressionist oil painting ",
    n: 3,
    size: "256x256",
  });
  const response3 = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "From this title:\n"+ article2 +"\nWrite an article that explains topics related to the title which is at least 2000 tokens in length, be clear and detailed in your output and do not repeat yourself.\nOUTPUT:",
    temperature: 0.5,
    max_tokens: 2993,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const response4 = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Write one paragraph that connects " + article +" with "+ article2 + " the paragraph should be at least 100 tokens long, but you can go up to 300 if you think it should be that long.\n",
    temperature: 0.5,
    max_tokens: 1993,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response3.data.choices[0].text)
  setResponse([article2,response3.data.choices[0].text,response4.data.choices[0].text])
  setImgUrlList([response2.data.data[0].url,response2.data.data[1].url,response2.data.data[2].url])
  setLoading(false);
  }


  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    
    setter(data,data2)
  };

  const handleChange = (event) => {
    event.preventDefault();
    setData(event.target.value);
  }
  const handleChange2 = (event) => {
    event.preventDefault();
    setData2(event.target.value);
  }

  useEffect(() =>{
    setLoading(false);
  },[response])
  
  
  return (

    <div className="contentAnalyzerPage">

      <div className="form-container">
        <form onSubmit={handleSubmit} >
            <Brand_AI type={"Content Generator"}></Brand_AI>
            <div style={{display:"flex", justifyContent:"space-evenly", flexDirection:"column", height:"80%"}}>
            <h3 style={{ fontWeight: "normal", color:"white", padding:"1vw", width:"100%", display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>Enter what your company does in the text box below.</h3>
          <div className="everythingContainer">
            
          
          <TextField
          onChange={handleChange}
          id="standard-multiline-static"
          className='inputFieldContent'
          multiline
          value={data.inData}
          maxRows={rowNum}
        
          variant="standard"
          InputProps={{ disableUnderline: true, style: { color: "white", padding:"2vh" } }}
          focusColor='white'
          sx={{border: '1px solid 202123', borderRadius: 1, color:"#202123"}}
        />
        
          
          </div>          
          <h3 style={{ fontWeight: "normal", color:"white", padding:"1vw", width:"100%", display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>Enter the topic of the blog</h3>
          <div className="everythingContainer">

          <TextField
        onChange={handleChange2}
        id="standard-multiline-static"
        className='inputFieldContent'
        multiline
        value={data2.inData}
        maxRows={rowNum}
      
        variant="standard"
        InputProps={{ disableUnderline: true, style: { color: "white", padding:"2vh" } }}
        focusColor='white'
        sx={{ border: '1px solid 202123', borderRadius: 1, color:"#202123"}}
      />
      </div>
      


          <div style={{width:"100%", display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
          <Button style={{width:"50%", backgroundColor:"#343541" }} variant="contained" onClick={handleSubmit}>Submit</Button>
          </div>
          </div>
          
        </form>

        {/*
        <div style={{
          display: "flex",
          flexDirection:"column",
          alignItems: "start",
          justifyContent: "start",
          marginTop: "3%",
          marginBottom: "5%",
        }}>
      
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
        </div>
      */}
        
      </div>
<AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
      >
<Box sx={{ ...style, display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", width: "100%", height:"100%", backgroundColor:"#202123" ,border:"none"}}>
  {loading?<div style={{  display:"flex", flexDirection:"column", justifyContent:"space-evenly", width:"100%", height:"100%", alignItems:"center"}}><Audio></Audio></div>
  :
  <div style={{  display:"flex", flexDirection:"column", justifyContent:"space-evenly", width:"80%", height:"100%", alignItems:"center"}}>
    <div style={{display:"flex", flexDirection:"column"}}>
    <p className="overallQualityTextHEADER">{response[0]}</p>
    
    </div>
    
    <div style={{display:"flex", flexDirection:"column"}}>

    <span className="overallQualityText" style={{whiteSpace: "pre-line"}}>{response[1]}</span>
    
    </div>
    
    <p className="overallQualityText">{response[2]}</p>
    
    <div style={{width: "100%",display:"flex", flexDirection:"row" ,justifyContent:"space-evenly"}}>
      <div style={
        {display: "flex", flexDirection: "column", width:"256px"}
      }>
      <a href={imgUrlList[0]} className="overallQualityText">Image Link</a>
      <img src={imgUrlList[0]}></img>
    </div>
    <div style={
        {display: "flex", flexDirection: "column", width:"256px"}
      }>
      <a href={imgUrlList[1]} className="overallQualityText">Image Link</a>
      <img src={imgUrlList[1]}></img>
    </div><div style={
        {display: "flex", flexDirection: "column", width:"256px"}
      }>
      <a href={imgUrlList[2]} className="overallQualityText">Image Link</a>
      <img src={imgUrlList[2]}></img>
    </div>
    
    </div>
    <span className="overallQualityText">Word count for the article: {response[1].split(" ").length + response[2].split(" ").length}</span>
  <Button onClick={handleClose}>Close</Button></div>}
  
  </Box>


      </motion.div>
    )}
  </AnimatePresence>
  
    </div>
  );
}
export default ContentGenerator