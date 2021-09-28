import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  formControl:{
    '& > *': {
        width: 400,
      },
      margin: theme.spacing(1),
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
    },
  formField: {
    margin: theme.spacing(1),
  },
  buttonArea: {
    margin: theme.spacing(1),
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
    marginBottom: "5em"
  },
  button: {
    width: 400,
    height: 50,
    fontWeight: "700",
    textTransform: "none",
    background: "gray !important",
    fontSize: "1.5em",
    color: "white !important"
  },
  buttonWidth: {
    width: 400,
  },
  headerOne: {
    marginRight: "0em",
    marginLeft: "85%",
  },
  headerTwo: {
    marginLeft: "0em",
    marginRight: "1%",
  },
  headerThree: {
    marginLeft: "0em",
    marginRight: "24%",
    fontSize: "0.9em"
  },
  paperOne: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  gridTwo: {
    backgroundColor: "#2668ed",
  },
  paperTwo: {
    padding: "11em 5em 9.5em 5em",
    backgroundColor: "#2668ed",
    color: "white",
    textAlign: "justify"
  },
  firstLink: {
    textDecoration: "none",
    '&:visited': {
        color:"blue"
      },
    '&$active': {
      backgroundColor:"blue",
      padding: "1px",
    },
    transition: theme.transitions.create(["background-color", "padding"], {duration: theme.transitions.duration.complex})
  },
  link: {
    textDecoration: "none",
    '&:visited': {
        color:"blue"
      },
    pointerEvents: "none",
    cursor: "default",
  },
  boldInput: {
    fontWeight: "bolder",
    fontSize: "1.3em"
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [click, setClick] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const [values, setValues] = React.useState({
    password: '',
    email: '',
    showPassword: false,
    inValid: false,
  });

  const { password, email, inValid} = values;
  const isDisabled = () => {
    if(password==="" || !re.test(email)){
    return true;
    }else{
      return false;
    }
  }
  
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateEmail = emailString => {
    return re.test(emailString);
  };
  const handleEmailValidation = () => {
    if(values.email === "") {
      setValues({...values, inValid: true, emailError: "Please provide an email address."})
      re.test(email)
    }else if(validateEmail(values.email)) {
      setValues({...values, inValid: false, emailError: ""})
    }else{
      setValues({...values, inValid: true, emailError:"Please enter a valid email address."})
    }
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let handleClick = (event) => {
    return setClick(true);
  };
  
  const animationClasses = () =>(!click ? "": "active");
  handleClick= handleClick.bind(this)
  
  useEffect(() => {
    return ()=> {
      setClick(false)
    }
  }, [click])


  const handleSubmit = (event) =>{
    event.preventDefault()
    setUserData(event.target[0].value)
  }
  return (
    <div>
      <Grid container>
        <Grid item xs={8} className={classes.gridOne}>
          <h5 className={classes.headerOne} onClick={handleClick}>Login page</h5>
          <h1 className={classes.headerTwo} onClick={handleClick}>Enter your details to Log in</h1>
          <h5 className={classes.headerThree} onClick={handleClick}>New User? 
            <Link to='/signup' className={`${classes.firstLink}${animationClasses()}`}>
              <a> Sign up here</a><span><strong className={classes.boldInput}> . </strong> . .</span>
            </Link>
          </h5>
          <form onSubmit={handleSubmit} className={classes.paperOne}>
            <FormControl className={classes.formControl} noValidate autoComplete="off">
              <TextField 
                id="outlined-basic" 
                className={classes.formField} 
                label="Your name (optional)" 
                variant="outlined" 
              />
              <TextField
                id="outlined-basic"
                label="Email address"
                variant="outlined"
                defaultValue= ""
                value={email}
                error = {inValid}
                helperText={values.emailError}
                onChange={handleChange('email')}
                onBlur = {handleEmailValidation}
                className={classes.formField}
              />
              <FormControl className={clsx(classes.formField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleChange('password')}
                  InputProps= {{
                    classes: {
                      input: classes.boldInput
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <div className={classes.buttonArea}>
                <Button 
                  className={`${!isDisabled()? classes.button:""} ${classes.buttonWidth}`}
                  disabled = {isDisabled()}
                  variant="contained"
                  type="submit"
                  component={Link}
                  to={`/userpage:${userData}`}
                >
                  Log in
                </Button>
              </div>
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={4} className={classes.gridTwo}>
          <Paper className={classes.paperTwo}>
            <Typography className={classes.footer}>
              <h2>Best Investment Banking</h2>           
              <p>We provides a wide range of investment banking, securities, and 
                investment management services to a substantial and diversified
                client base that includes corporations, financial institutions, 
                governments, and individuals </p>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
