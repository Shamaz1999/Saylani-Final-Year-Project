import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

class Ad extends Component {

    state = {
        id: this.props.match.params.adId,
        ad: '',
        user: JSON.parse(localStorage.getItem("user")),
        // favAdId: '',
        isFav:false,
    }


    componentDidMount() {

        //Updating User
        var isFav = false;
         var user = JSON.parse(localStorage.getItem("user"));
         var adId=this.props.match.params.adId;

         if(user){
            var option = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            fetch('http://localhost:8000/updateuser', option)
                .then(res => res.json())
                .then(data => {
                    this.setState({user:data})
                    console.log(this.state)
                    let user = JSON.parse(localStorage.getItem('user'));
                    if (user===null) {
                        user = {
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            DOB: data.DOB,
                            phone: data.phone,
                            gender: data.gender,
                            country: data.country,
                            date: data.date,
                            address: data.address,
                            url1: data.url1,
                            about: data.about,
                            favorites : data.favorites
                        }
                        localStorage.setItem('user', JSON.stringify(user))
                        console.log(user)
                    }
                    user = {
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        DOB: data.DOB,
                        phone: data.phone,
                        gender: data.gender,
                        country: data.country,
                        date: data.date,
                        address: data.address,
                        url1: data.url1,
                        about: data.about,
                        favorites:data.favorites
                    }
                    localStorage.setItem('user', JSON.stringify(user))
                })
                .catch(err => console.log(err))


            isFav = user.favorites.includes(adId);
            this.setState({isFav:isFav});
         }
         else{
            console.log('user is not logged in')
         }

       



        var option1 = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('http://localhost:8000/currentad', option1)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ ad: data },
                    () => console.log(this.state))
                this.props.dispatch({ type: 'insertads', payload: this.state.ad.sellerId })
            })
            .catch(err => console.log(err))
    }

    phoneLoginAlert = () => {
        var user = JSON.parse(localStorage.getItem("user"))
        if (user !== "")
            alert("You need to Log In to view the number!")
        else
            return
    }
    chatLoginAlert = () => {
        var user = JSON.parse(localStorage.getItem("user"))
        if (user !== "")
            alert("You need to Log In to chat with this user!")
        else
            return
    }
    favLoginAlert = () => {
        var user = JSON.parse(localStorage.getItem("user"))
        if (user !== "")
            alert("You need to Log In to mark as favourite!")
        else
            return
    }



        
        
        render() {
       
         var user = JSON.parse(localStorage.getItem("user"));
      
        let markFav = () => {
            if (!this.state.isFav) {

               
                var option = {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                fetch('http://localhost:8000/markfavorite', option)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({user:data});
                        let user = JSON.parse(localStorage.getItem('user'));
                        if (user === null) {
                            user = {
                                _id: data._id,
                                name: data.name,
                                email: data.email,
                                password: data.password,
                                DOB: data.DOB,
                                phone: data.phone,
                                gender: data.gender,
                                country: data.country,
                                date: data.date,
                                address: data.address,
                                url1: data.url1,
                                about: data.about,
                                favorites: data.favorites
                            }
                            localStorage.setItem('user', JSON.stringify(user))
                        }
                        user = {
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            DOB: data.DOB,
                            phone: data.phone,
                            gender: data.gender,
                            country: data.country,
                            date: data.date,
                            address: data.address,
                            url1: data.url1,
                            about: data.about,
                            favorites: data.favorites
                        }
                        localStorage.setItem('user', JSON.stringify(user))
                        
                    })
                    .catch(err => console.log(err))

                    this.setState({isFav:true});
            }
            else {
              
                var option1 = {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: { 'Content-Type': 'application/json' }
                }

                fetch('http://localhost:8000/removefavorite', option1)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({user:data})
                        let user = JSON.parse(localStorage.getItem('user'));
                        if (user === null) {
                            user = {
                                _id: data._id,
                                name: data.name,
                                email: data.email,
                                password: data.password,
                                DOB: data.DOB,
                                phone: data.phone,
                                gender: data.gender,
                                country: data.country,
                                date: data.date,
                                address: data.address,
                                url1: data.url1,
                                about: data.about,
                                favorites: data.favorites
                            }
                            localStorage.setItem('user', JSON.stringify(user))
                        }
                        user = {
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            DOB: data.DOB,
                            phone: data.phone,
                            gender: data.gender,
                            country: data.country,
                            date: data.date,
                            address: data.address,
                            url1: data.url1,
                            about: data.about,
                            favorites: data.favorites
                        }
                        localStorage.setItem('user', JSON.stringify(user))
                      
                    })
                    .catch(err => console.log(err))
                    this.setState({isFav:false})
            }

        }


       


        window.scrollTo(0, 0);
        console.log(this.state)

        const handleOnDragStart = e => e.preventDefault()
        var arr = [this.state.ad.url1, this.state.ad.url2, this.state.ad.url3, this.state.ad.url4]
        let item = [1, 2, 3, 4].map((i) => (
            <div key={i}>
                <img key={this.state.ad.url1} src={arr[i - 1]} height='500' width='1200' onDragStart={handleOnDragStart} alt="adpic" className="yours-custom-class" />
            </div>
        ))
        return (
            <div className="app" >
                <div className="row" >
                    <div className="col-md-8" style={{ margin: "0px " }}>
                        <div className="ad-img-container">
                            {/* <img src={this.state.ad.url1} alt=""/>               */}
                            <AliceCarousel items={item} autoPlay={false} mouseDragEnabled />
                            {/* </AliceCarousel> */}
                        </div>
                        <div className="ad-desc-container">
                            <h4>Details</h4>
                            <div className="ad-detail-container">
                                <div className="float-left">
                                    <p className="ads-type">Type</p>
                                    <div className="ads-type">{this.state.ad.category}</div>
                                </div>
                                <div className="float-right">
                                    <p className="ads-type">Condition</p>
                                    <div className="ads-type">{this.state.ad.condition}</div>
                                </div>
                                <div className="clear"></div>
                            </div>
                            <div className="contaner">
                                <hr />
                            </div>
                            <h4>Description</h4>
                            <div style={{ marginTop: "15px" }}>
                                {this.state.ad.description}

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="row">
                            <div className="col-md-12" style={{ padding: "0px" }}>
                                <div className="price-container" style={{ padding: "15px 30px" }}>
                                    <h1 className="float-left">Rs {this.state.ad.price}</h1>
                                    <div className="favourite-container float-right">
                                        <FontAwesome name={this.state.isFav?"star":"star-o"} id="favIcon" size="2x" ref="fav" className="face"
                                            onClick={user ? markFav : this.favLoginAlert}/>
                                    </div>
                                    <div className="adTitle-container clear">
                                        {this.state.ad.adTitle}
                                    </div>
                                    <div className="container1">
                                        <div className="loc-container float-left">
                                            {this.state.ad.location}
                                        </div>
                                        <div className="loc-container float-right">
                                            {this.state.ad.date}
                                        </div>
                                        <div style={{ marginBottom: "10px" }} className="clear"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12" style={{ padding: "0px", marginTop: "50px" }}>
                            <div className="seller-container" style={{ padding: "30px" }}>
                                <h5 className="" style={{ paddingBottom: "10px" }}>Seller Description</h5>
                                <div className="seller-info-container ">
                                    <div className="seller-img-container">
                                        <img src={this.state.ad.sellerImg} height="70" alt="Profile Pictur" />
                                    </div>
                                    <div className="seller-name-container">
                                        <Link to={this.props.match.params.adId + "/sellerProfile"} onClick={this.st}>{this.state.ad.sellerName}</Link>
                                    </div>
                                </div>

                                <div className="container2">
                                    <span className="phone-container">
                                        <div className="number"
                                            onClick={user ? () => true : this.phoneLoginAlert}>
                                            <span className="phone-image-conainer">
                                                <img src={require('./../images/phone.png')} height="20" alt="phone" />
                                            </span>
                                            <input className="no-border no-outline phone-no-field " disabled value={this.state.ad.phone}
                                                type={user ? "text" : "password"}/>
                                        </div>
                                    </span>
                                    <span className="user-chat-btn-container pb-3 text-center">
                                        <button style={{ width:'50% '}} className="btn login-btn no-margin"
                                            onClick={user ? () => this.props.history.push('/' + this.state.ad.sellerId + '/chat') : this.chatLoginAlert}>
                                            Chat</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        ad: store.adsReducer
    }
}
export default connect(mapStateToProps)(Ad);

// export default Ad