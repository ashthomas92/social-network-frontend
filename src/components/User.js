import React from 'react';
import {
  Typography,
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  ButtonGroup,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';

export default class User extends React.Component {

  state = {
    user: [],
    location: [],
    posts: []
  }

  componentDidMount () {
    const { id } = this.props.match.params

    fetch(`https://n161.tech/api/dummyapi/user/${id}`)
      .then(response => response.json())
      .then((user) => {
        this.setState(() => ({
          user: user,
          location: user.location
        }));
      })

    fetch(`https://n161.tech/api/dummyapi/user/${id}/post?limit=3`)
      .then(response => response.json())
      .then((posts) => {
        this.setState(() => ({ posts: posts.data }));
      })
  }

  render(){

    let dob;

    if (this.state.user.dob){
      dob = new Date(this.state.user.dob);
      let date = dob.getDate();
      let month = dob.getMonth()+1;
      let year = dob.getFullYear();
      dob = `Born ${date}/${month}/${year}`;
    } else {
      dob = '';
    }

    let color;

    if (this.state.user.gender==='male'){
      color = 'primary';
    } else if (this.state.user.gender==='female'){
      color = 'secondary';
    } else {
      color = 'inherit';
    }

    let address;

    if (this.state.location.street){
      address = `${this.state.location.street}, ${this.state.location.city}, ${this.state.location.state}, ${this.state.location.postcode}`
    } else {
      address = '';
    }

    return (
      <div className="User">
          <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
            <Avatar src={this.state.user.image} alt={this.state.user.firstName + ' ' + this.state.user.lastName} style={{margin: '10px', width: '80px', height: '80px'}} />
            <div>
              <Typography variant="h4" component="h2">
                {this.state.user.firstName} {this.state.user.lastName}
              </Typography>
              <Typography component="p">
                {dob}
              </Typography>
            </div>
            <div style={{position: 'absolute', right: 30}}>
              <ButtonGroup
                variant="contained"
                color={color}
                aria-label="full-width contained primary button group"
              >
                <Button>Message</Button>
                <Button>Friend</Button>
                <Button>Follow</Button>
              </ButtonGroup>
            </div>
          </div>
          <Divider />
          <Typography variant="h5" component="h2" style={{margin: '20px'}}>
            Contact info
          </Typography>
          <Divider style={{margin: '0 20px'}} />
          <Grid container spacing={2}>
            <Grid item xs>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color={color} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone number"
                    secondary={this.state.user.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIphoneIcon color={color} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Mobile number"
                    secondary={this.state.user.cell}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon color={color} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary={address}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color={color} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email address"
                    secondary={this.state.user.email}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Typography variant="h5" component="h2" style={{margin: '20px'}}>
            Recent Posts
          </Typography>
          <Divider style={{margin: '0 20px'}} />
          <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '15px 10px'}}>
            {this.state.posts.map(function(item, index){
              return (
                <Card key={item.id} style={{width: '30%', margin: '1.5%'}}>
                  <CardMedia
                    style={{height: 0, paddingTop: '56.25%'}}
                    image={item.image}
                    title={item.message}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {item.message}
                    </Typography>
                  </CardContent>
                  {item.tags.map(tag => {
                    if (tag) {
                      return (
                        <Link to={`/tag/${tag}`} key={tag}>
                          <Chip
                            variant="outlined"
                            clickable={true}
                            style={{margin: '5px'}}
                            label={tag}
                          />
                        </Link>
                      );
                    }
                  })}
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              )
            })}
          </div>
      </div>
    );
  }
}
