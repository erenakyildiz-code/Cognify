import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const arr = ["color","food","music","movie","sport"];
const arrItem = {"color":["Red","Blue","Green","Yellow"],"food":["italian","mexican","chinese","thai"],"music":["Pop","Jazz","Country","Hip-Hop"],"movie":["Romance","Comedy","Horror","Action"],"sport":["Soccer","Football","Basketball","Baseball"]}



function QuizInside(props){
  var name = props.name;
    return(
      <FormControl fullWidth>
      <FormLabel style={{padding:"10vh",fontSize:"50px"}} id={name}>{name}</FormLabel>
      <RadioGroup
      style={{justifyContent:"space-between",flexDirection:"row", width:"100%"}}
        
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event) => {
          const changedVal = props.valueFromTop;
          changedVal[props.index] = event.target.value;
          props.setValues(changedVal);
        }}
      >
        <FormControlLabel value={arrItem[name][0]} control={<Radio />} label={arrItem[name][0]}/>
        <FormControlLabel value={arrItem[name][1]} control={<Radio />} label={arrItem[name][1]}/>
        <FormControlLabel value={arrItem[name][2]} control={<Radio />} label={arrItem[name][2]}/>
        <FormControlLabel value={arrItem[name][3]} control={<Radio />} label={arrItem[name][3]}/>
        
      </RadioGroup>
    </FormControl>
    
    )
}

function Quizgenerator(){
  
  const [response, setResponse] = useState("");
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokensUsed, setTokensUsed] = useState(0);
  const [values,setValues] = useState(["","","","",""]);
  const rows = [];
  async function clickHandler(){
    const reponseai = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Generate a buzfeed quiz, but have actual connections between the their selections and the answer they get from finishing the quiz\n\n1. What's your favorite  color? \nA. Red\nB. Blue\nC. Green\nD. Yellow\n\n2. What type of food do you prefer?\nA. Italian\nB. Mexican\nC. Chinese\nD. Thai\n\n3. What's your favorite type of music?\nA. Pop\nB. Jazz\nC. Country\nD. Hip-Hop\n\n4. What's your favorite type of movie?\nA. Romance\nB. Comedy\nC. Horror\nD. Action\n\n5. What's your favorite type of sport?\nA. Soccer\nB. Football\nC. Basketball\nD. Baseball\n\nResults:\nIf you chose mostly A's: You are a romantic person with a taste for Italian food, Pop music, and Soccer.\n\nIf you chose mostly B's: You are a funny person with a taste for Mexican food, Jazz music, and Football.\n\nIf you chose mostly C's: You are an adventurous person with a taste for Chinese food, Country music, and Basketball.\n\nIf you chose mostly D's: You are an energetic person with a taste for Thai food, Hip-Hop music, and Baseball.\n\nmake your answers more vague\n\n1. What's your favorite hue?\nA. Red\nB. Blue\nC. Green\nD. Yellow\n\n2. What type of cuisine do you prefer?\nA. Italian\nB. Mexican\nC. Chinese\nD. Thai\n\n3. What's your preferred genre of music?\nA. Pop\nB. Jazz\nC. Country\nD. Hip-Hop\n\n4. What's your favorite type of film?\nA. Romance\nB. Comedy\nC. Horror\nD. Action\n\n5. What's your favorite sport?\nA. Soccer\nB. Football\nC. Basketball\nD. Baseball\n\nAnswer these questions according to their family resemblance, I will explain what family resemblance is now.\n\nThe local context where the topic of family resemblances appears is Wittgenstein's critique of language. In Philosophical Investigations §65-71 the plurality of language uses is compared to the plurality of games. Next it is asserted that games have common features but no one feature is found in all of them. The whole argument has become famous under the heading 'language games'.\n\nThe larger context in which Wittgenstein's philosophy is seen to develop considers his uncompromising opposition to essences, mental entities and other forms of idealism which were accepted as a matter of fact in continental philosophy at the turn of the preceding century. In his view, the main cause for such errors is language and its uncritical use. In the received view, concepts, categories or classes are taken to rely on necessary features common to all items covered by them. Abstraction is the procedure which acknowledges this necessity and derives essences, but in the absence of a single common feature, it is bound to fail.\n\nResults:\nIf you chose mostly A's: You are a passionate person who enjoys the energy of red, Italian cuisine, Pop music, Romance films, and Soccer.\n\nIf you chose mostly B's: You are a laid-back person who enjoys the tranquility of blue, Mexican cuisine, Jazz music, Comedy films, and Football.\n\nIf you chose mostly C's: You are an adventurous person who enjoys the vibrancy of green, Chinese cuisine, Country music, Horror films, and Basketball.\n\nIf you chose mostly D's: You are an energetic person who enjoys the brightness of yellow, Thai cuisine, Hip-Hop music, Action films, and Baseball.\n\nDon't say mostly A's, think more deeply, think in paths such as A-A-A-A-A, and A-A-A-A-B, I don't want all the answers, I just want 5 example answers\n\nIf you chose A-A-A-A-A: You are a passionate person who enjoys the energy of red, Italian cuisine, Pop music, Romance films, and Soccer.\n\nIf you chose A-A-A-A-B: You are a fun-loving person who enjoys the vibrancy of red, Mexican cuisine, Pop music, Comedy films, and Football.\n\nIf you chose A-A-A-B-B: You are an adventurous person who enjoys the tranquility of red, Chinese cuisine, Jazz music, Horror films, and Basketball.\n\nIf you chose A-A-B-B-B: You are a lively person who enjoys the brightness of red, Thai cuisine, Country music, Action films, and Baseball.\n\nIf you chose A-B-B-B-B: You are an energetic person who enjoys the energy of blue, Italian cuisine, Hip-Hop music, Romance films, and Soccer.\n\nTry to find a connection between the energy of red and a passionate person and re answer\n\nIf you chose A-A-A-A-A: You are a passionate person who enjoys the vibrant energy of red, Italian cuisine, Pop music, Romance films, and Soccer.\n\nIf you chose A-A-A-A-B: You are a fun-loving person who enjoys the vibrant energy of red, Mexican cuisine, Pop music, Comedy films, and Football.\n\nIf you chose A-A-A-B-B: You are an adventurous person who enjoys the calming energy of blue, Chinese cuisine, Jazz music, Horror films, and Basketball.\n\nIf you chose A-A-B-B-B: You are a lively person who enjoys the cheerful energy of yellow, Thai cuisine, Country music, Action films, and Baseball.\n\nIf you chose A-B-B-B-B: You are an energetic person who enjoys the energizing energy of blue, Italian cuisine, Hip-Hop music, Romance films, and Soccer.\n\nExplain your answers in depth please, with the appropriate reasons\n\nIf you chose A-A-A-A-A: You are a passionate person who enjoys the vibrant energy of red, Italian cuisine, Pop music, Romance films, and Soccer. Red is associated with energy, passion, and excitement, attributes which can be found in Italian cuisine, Pop music, Romance films, and Soccer. Italian cuisine is known for its bold flavors, Pop music is upbeat and lively, Romance films typically feature passionate storylines, and Soccer is a fast-paced, thrilling game.\n\n\nI will now give you paths, and you will answer with these kinds of responses.\n\n" + values[0] + "-" + values[1] + "-" + values[2] + "-" +values[3] + "-" + values[4] +"\n",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    


    setResponse(reponseai.data.choices[0]);
    setTokensUsed(reponseai.data.usage.total_tokens);
    if (totalTokens === 0) {
      setTotalTokens(reponseai.data.usage.total_tokens);
    } else {
      setTotalTokens(reponseai.data.usage.total_tokens + totalTokens);
    }
  }
  let varib = 0;
  arr.forEach(element => {
    
    rows.push(<QuizInside setValues={setValues} name={element} index={varib} valueFromTop={values}/>);
    varib += 1;
  });

return <>
<tbody style={{display: "flex",flexDirection:"column", alignItems:"center",justifyContent:"space-evenly"}}>{rows}</tbody>

<Button style={{backgroundColor:"black"}} fullWidth variant="contained" size='large' onClick={clickHandler}>Calculate</Button>

<TextField inputProps={
					{ readOnly: true}
				}  style={{width: "100%", marginTop: "2%", backgroundColor:"white"}} id="outlined-multiline2"
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
        width:"100%"
      }}>
        
        <h3 className="form-creator">Pricing data </h3>
        <p className="explainer">You can see your usage data here, since this is a proof of concept, you can see all models and what they would cost even though we are using davinci003</p>
        <p className="explainer3">Tokens Used: {tokensUsed}</p>
        <p className="explainer3">Total Tokens Used in Session: {totalTokens}</p>
        <div className="bottomFormTotal">
        <Card className="bottomFormCard" sx={{ maxWidth: 400 }} >
          <p className="explainer2">Davinci</p>
          
         
          <p className="explainer3">Price in USD for the entire session: {totalTokens * 0.00002}$USD </p>
        </Card>
        <Card className="bottomFormCard" sx={{ maxWidth: 400 }}>
        <p className="explainer2">Ada</p>
          <p className="explainer3">Price in USD for the entire session: {totalTokens * 0.0000004}$USD </p>
        </Card>
        <Card className="bottomFormCard" sx={{ maxWidth: 400 }}>
        <p className="explainer2">Babbage</p>
          <p className="explainer3">Price in USD for the entire session: {totalTokens * 0.0000005}$USD </p>
        </Card>
        <Card className="bottomFormCard" sx={{ maxWidth: 400 }}>
        <p className="explainer2">Curie</p>
          <p className="explainer3">Price in USD for the entire session: {totalTokens * 0.000002}$USD </p>
        </Card>
      </div>
      </div>
</>;

}

export default Quizgenerator;