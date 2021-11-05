import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { createUser } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  formControl: {
    "& > *": {
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
  align: {
    display: "flex",
    alignItems: "flex-start",
    margin: theme.spacing(1),
  },
  alignTwo: {
    padding: "18em",
  },
  buttonArea: {
    margin: theme.spacing(1),
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
  },
  button: {
    width: 400,
    height: 50,
    fontWeight: "700",
    textTransform: "none",
    background: "gray !important",
    fontSize: "1.5em",
    color: "white !important",
  },
  buttonWidth: {
    width: 400,
  },
  headerOne: {
    marginRight: "0em",
    marginLeft: "86%",
  },
  headerTwo: {
    marginLeft: "0em",
    marginRight: "3%",
  },
  headerThree: {
    marginLeft: "0em",
    marginRight: "17%",
    fontSize: "0.9em",
  },
  paperOne: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  gridTwo: {
    backgroundColor: "#2668ed",
  },
  paperTwo: {
    padding: "11em 5em 10em 5em",
    backgroundColor: "#2668ed",
    color: "white",
    textAlign: "justify",
  },
  firstLink: {
    textDecoration: "none",
    "&:visited": {
      color: "blue",
    },
    "&$active": {
      backgroundColor: "blue",
      padding: "1px",
    },
    transition: theme.transitions.create(["background-color", "padding"], {
      duration: theme.transitions.duration.complex,
    }),
  },
  boldInput: {
    fontWeight: "bolder",
    fontSize: "1.3em",
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    "&:visited": {
      color: "blue",
    },
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [click, setClick] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [values, setValues] = React.useState({
    name: "",
    password: "",
    showPassword: false,
    email: "",
    emailError: "",
    inValid: false,
    position: "",
  });

  let handleClick = (event) => {
    return setClick(true);
  };

  let animationClasses = () => (!click ? "" : "active");
  handleClick = handleClick.bind(this);

  useEffect(() => {
    return () => {
      setClick(false);
    };
  }, [click]);

  const { name, password, email, position, inValid } = values;
  const isDisabled = () => {
    if (name === "" || password === "" || position === "" || !re.test(email)) {
      return true;
    } else {
      return false;
    }
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  handleChange();

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateEmail = (emailString) => {
    return re.test(emailString);
  };

  const handleEmailValidation = () => {
    if (values.email === "") {
      setValues({
        ...values,
        inValid: true,
        emailError: "Please provide an email address.",
      });
      re.test(email);
    } else if (validateEmail(values.email)) {
      setValues({ ...values, inValid: false, emailError: "" });
    } else {
      setValues({
        ...values,
        inValid: true,
        emailError: "Please enter a valid email address.",
      });
    }
  };

  // const handleFormSubmit = (event) => {
  //   console.log(rows)
  //   try{
  //     fetch('https://postpaddy.com/api/invite/new', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(rows),
  //     })
  //   }catch(err){
  //     console.error('Error:', err)
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await createUser(values);

    if (res?.data?.success) {
      alert("Success");
    } else if (res?.data?.failure) {
      alert(res?.data?.failure);
    } else {
      alert("An error occurred");
    }
    setUserData(event.target[0].value);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={8} className={classes.gridOne}>
          <h5 className={classes.headerOne} onClick={handleClick}>
            Sign up page{" "}
          </h5>
          <h1 className={classes.headerTwo} onClick={handleClick}>
            Let's set up your account
          </h1>
          <h5 className={classes.headerThree} onClick={handleClick}>
            Already have an account?
            <Link
              to="/"
              className={`${classes.firstLink}${animationClasses()}`}
            >
              <a> Sign in</a>
              <span>
                <strong className={classes.boldInput}> . </strong> . .
              </span>
            </Link>
          </h5>
          <form onSubmit={handleSubmit} className={classes.paperOne}>
            <FormControl className={classes.formControl} autoComplete="off">
              <TextField
                id="outlined-basic"
                className={classes.formField}
                label="names"
                value={name}
                onInput={(e) => setValues({ ...values, name: e.target.value })}
                onChange={handleChange("name")}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Email address"
                defaultValue={email}
                variant="outlined"
                error={inValid}
                helperText={values.emailError}
                onChange={handleChange("email")}
                className={classes.formField}
                onBlur={handleEmailValidation}
              />
              <FormControl className={classes.formField} variant="outlined">
                <InputLabel>Your current position as</InputLabel>
                <Select
                  native
                  labelId="demo-simple-select-outlined-label"
                  defaultValue={10}
                  value={position}
                  onChange={handleChange("position")}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  label="I would describe my user type as"
                >
                  <option value="" />
                  <option value={10}>Manager</option>
                  <option value={20}>Client</option>
                  <option value={30}>Developer</option>
                  <option value={40}>Student</option>
                </Select>
              </FormControl>
              <FormControl
                className={clsx(classes.formField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={password}
                  defaultValue=""
                  onChange={handleChange("password")}
                  InputProps={{
                    classes: {
                      input: classes.boldInput,
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <div className={classes.buttonArea}>
                <strong>minimum of 8 characters.</strong>
                <Button
                  className={`${!isDisabled() ? classes.button : ""} ${
                    classes.buttonWidth
                  }`}
                  variant="contained"
                  disabled={isDisabled()}
                  type="submit"
                  // component={Link}
                  // to={`/userpage:${userData}`}
                >
                  Sign up
                </Button>
              </div>
            </FormControl>
            <p>
              By clicking the "Next" button, you agree to creating a free
              account and to
              <a href="/" className={classes.link}>
                {" "}
                Terms of Service{" "}
              </a>
              and
              <a href="/" className={classes.link}>
                {" "}
                Privacy Policy.
              </a>
            </p>
          </form>
        </Grid>
        <Grid item xs={4} className={classes.gridTwo}>
          <Paper className={classes.paperTwo}>
            <Typography className={classes.footer}>
              <h2>Best Investment Banking</h2>
              <p>
                We provides a wide range of investment banking, securities, and
                investment management services to a substantial and diversified
                client base that includes corporations, financial institutions,
                governments, and individuals{" "}
              </p>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
