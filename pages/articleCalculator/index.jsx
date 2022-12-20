import { useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Brand_AI from "../Header";
import styled from "@emotion/styled";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import dynamic from 'next/dynamic'
import { Audio } from 'react-loader-spinner';

import Rating from '@mui/material/Rating';

const { Configuration, OpenAIApi } = require("openai");


const ReactApexChart = dynamic(
  () => import('./modalChart'),
  { ssr: false }
)
const ContractForm = ()=> {

  const [data, setData] = useState({
    inData: ""
  });
  const [response, setResponse] = useState("");
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [opt,setOpt] = useState("a Doctor's");
  const [loading ,setLoading] =useState(true);
  const [open, setOpen] = useState(false);
  const [dataSample, setDataSample] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
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
  const top5options = ["a Doctor's", "an Engineer's", "an Average person's", "a University Proffessor's", "a Marketing Executive's"];
  const top5options2 = ["TikTok type content", "Twitter type content", "Academic content", "YouTube content", "Movie content"];
  const top5options3 = ["No detail, just rating", "Regular explaination of results", "Precise detail with examples", "Explainations that have connections with ideas", "Precise, Scientific detail"];
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
  async function setter(article) 
  {
    setLoading(true);
    setOpen(true);
    

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Q: Assess the quality of the article below from 1 to 10, 1 being the lowest quality and 10 being the highest quality, for the list items below, from an Average Person's perspective. Take the intention of the article as \"detailed explanation\". Explain the weak and non-existing points in the article for each list item. Then, show the overall quality score for the article that will be the average of the quality points of each list item. Then, write the overall weak and non-existing points of the article. Give your response as a Javascript object. The Javascript object should have key-value pairs. Each pair would be every line of your response like the example below. Add the overall quality score and weak points in the object as the example below:\n\n{\"Relevance to the topic at hand.\":[\"8\",\"The article provides a detailed explanation of the topic at hand.\"]}\n\n1. Relevance to the topic at hand.\n2. The level of detail provided in the article.\n3. The accuracy and credibility of the information presented.\n4. The writing style, including grammar and clarity.\n5. The organization of the information and the logical flow of ideas.\n6. The objectivity of the author and the presence of bias.\n7. The presence of supporting evidence and sources.\n8. The timeliness of the information.\n9. The accessibility of the language used.\n10. The potential impact and significance of the information presented.",
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setLoading(false);
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

    <div className="contentAnalyzerPage">
      
      



      <div className="form-container">
        <form onSubmit={handleSubmit} >
            <Brand_AI></Brand_AI>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", height:"100%"}}>
            <h3 style={{ fontWeight: "normal", color:"white", padding:"1vw", width:"100%", display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>Enter your content in the box below and choose the appropriate options</h3>
          <div className="everythingContainer">
            
          
          <TextField
          onChange={handleChange}
          id="standard-multiline-static"
          className='inputFieldContent'
          multiline
          rows={22}
          value={data.inData}
          variant="standard"
          InputProps={{ disableUnderline: true, style: { color: "white", padding:"2vh" } }}
          focusColor='white'
          sx={{border: '1px solid 202123', borderRadius: 1, color:"#202123"}}
        />
      
          
          </div>
          <div className="flexBoxFix">
            <div className="itemOfFlexBox">
              <Autocomplete
              
                id="combo-box-demo"
                options={top5options}
                onChange={handleChangeCombo}
                renderInput={(params) =>  <CssTextField  sx={{   borderRadius:"5px", backgroundColor:"#ffffff",  color:"black"}} focusColor='#202123' {...params} placeholder="Perspective Options" />}
              />
              
            </div>
            <div className="itemOfFlexBox">
              <Autocomplete
                id="combo-box-demo"
                options={top5options2}
                onChange={handleChangeCombo}
                renderInput={(params) =>  <CssTextField sx={{borderRadius:"5px", backgroundColor:"#ffffff"}} focusColor='#202123' {...params} placeholder="Media Options" />}
              />
              
            </div>

            <div className="itemOfFlexBox">
              <Autocomplete

                id="combo-box-demo"
                options={top5options3}
                onChange={handleChangeCombo}
                renderInput={(params) =>  <CssTextField  sx={{  borderRadius:"5px", backgroundColor:"#ffffff",  color:"black"}} focusColor='#202123' {...params}  placeholder="Detail Options"/>}
              />
              
            </div>


            
              
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
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", width: "50%", height:"80%", borderRadius:"10px", backgroundColor:"#ffffff" ,border:"none"}}>
  {loading?<><ReactApexChart></ReactApexChart>
  <div className="overallQualityText"><div style={{width:"20%", display:"flex", flexDirection:"column", alignItems:"center"}}>Overall score<Rating name="read-only" value={5} max={10} readOnly /></div></div>
      </>:<Audio></Audio>}
  
  </Box>
</Modal>
    </div>
  );
}
export default ContractForm