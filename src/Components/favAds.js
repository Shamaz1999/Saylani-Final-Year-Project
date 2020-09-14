import React, { Component } from 'react';
import "./../bootstrap/bootstrapC.css"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class FavAds extends Component {
    state = {
        ads: [],
        user: JSON.parse(localStorage.getItem('user')),
        id: '',
        isDataLoaded: false,
        show: false,
    }

    componentDidMount() {
        //Updating User
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
                this.setState({ user: data })
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
                    favorites: data.favorites
                }
                localStorage.setItem('user', JSON.stringify(user))
                console.log('User Updated' + user.favorites)
            })
            .catch(err => console.log(err))






        let user = JSON.parse(localStorage.getItem('user'))
        let favs = user.favorites;
        console.log('THis is user ' + user.favorites);
        console.log('THis is fav ' + favs);
        console.log('THis is state ' + this.state.user.favorites);

        var option1 = {
            method: 'POST',
            body: JSON.stringify(favs),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('http://localhost:8000/favoriteads', option1)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ ads: data }, () => console.log(this.state))
                this.setState({ isDataLoaded: true })
            })
            .catch(err => console.log(err))
    }


    render() {
        const handleClose = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });

        const removefav = (id) => {
            this.setState({ id: id }, () => {

                // var c = window.confirm('Are you sure you want to remove it from favorites?')
                // if (c) {
                    var option = {
                        method: 'POST',
                        body: JSON.stringify(this.state),
                        headers: { 'Content-Type': 'application/json' }
                    }

                    fetch('http://localhost:8000/removefavorite', option)
                        .then(res => res.json())
                        .then(data => {
                            this.setState({ user: data }, () => {
                                console.log(this.state)
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
                                    favorites: data.favorites
                                }
                                localStorage.setItem('user', JSON.stringify(user))
                                var ads = [...this.state.ads];
                                ads.map((value, index) => {
                                    if (value._id === this.state.ads[index]._id) {
                                        ads.splice(index, 1)
                                        this.setState({ ads: ads }, () => console.log(this.state))
                                    }
                                })

                            })

                        })
                        .catch(err => console.log(err))
                        this.setState({show:false})

                    toast('Ad removed from favorites!', {
                        className: 'logout-toast',
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        closeButton: false,
                        // progress: undefined,
                    })
                        // (this.props.history.push('/login'))

                }
                // else {
                //     return false
                // }
            // }
            )
        }




        let skeletonCards = [1, 2, 3, 4,]
        let sc;
        window.scrollTo(0, 0);


        //Skeleteon Card Ads

        for (let i = 1; i !== skeletonCards.length; i++) {
            sc = skeletonCards.map((item, index) => {
                return <div className="card-wrapper" >
                    <div className="card" style={im} >
                        <Skeleton height={200} />
                        <div className="card-body">
                            <h5 className="card-title text-left"><Skeleton /></h5><h5 className="card-title text-left"><Skeleton /></h5>
                            <div className="divider"><hr /></div>
                            <p className="text-left"> <Skeleton /></p>
                            <div className="card-text text-left ad-description"><Skeleton /></div>
                            <div className="card-text text-left ad-description"><Skeleton /></div>
                            <div className="d-flex space-btw align-center ads-btn-container">
                                <span className="float-left" style={{ fontSize: '13px', color: 'grey' }}><Skeleton width={90} /></span>
                                <span>
                                    <Skeleton width={90} />
                                    {/* <Link to={"/ad/"} className="btn login-btn open-ad-btn float-right" style={{ marginTop: "0px" }}>Open Ad</Link> */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            })
        }

        let im = {
            margin: "20px 0",
        }

        const handleOnDragStart = e => e.preventDefault()

        const items = (data) => {
            return data.map((url, index) => {
                return (<div key={index}>
                    <img height='180' src={url} onDragStart={handleOnDragStart} alt="Adpic" />
                </div>)
            })
        }
        return (

            <div className="App" style={{ textAlign: "center" }}>
                <div className="display-4 mt-5 mb-5">Favorite Ads</div>

                <div className="row no-nothing">
                    {
                        this.state.isDataLoaded
                            ?
                            <>{this.state.ads.length ?
                                this.state.ads.map((ad, index) => {
                                    return (<div className="col-md-4"  >
                                        <div class="card" style={im} >
                                            <AliceCarousel
                                                buttonsDisabled={true} duration={400} autoPlay={true} autoPlayInterval={5000} mouseDragEnabled >
                                                {items([ad.url1, ad.url2, ad.url3, ad.url4])}
                                            </AliceCarousel>
                                            <div class="card-body">
                                                <h6 className='float-left'>{ad.adTitle}</h6>
                                                <h6 className='float-right'>Rs {ad.price}</h6>
                                                <div className="clear"></div>
                                                <p className="ad-description">{ad.description}</p>
                                                <div>
                                                    <div className="float-left small">{ad.location}</div>
                                                    <div className="float-right small">{ad.date}</div>
                                                </div>
                                            </div>
                                            <div className="text-left">
                                                <Button
                                                    // onClick={() => removefav(ad._id)}
                                                    onClick={() => handleShow()}
                                                    bsPrefix="edit-ad-btn no-outline no-border" >Remove</Button>
                                            </div>
                                        </div>
                                        {/* Confirmation Modal */}
                                        <Modal  className="confirmation-modal" show={this.state.show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirm</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to remove this ad from favorites?</Modal.Body>
                                            <Modal.Footer className="confirmation-modal-footer">
                                                <Button className="confirmation-modal-yes-btn no-outline" onClick={() => removefav(ad._id)}>Yes</Button>
                                                <Button className="confirmation-modal-no-btn no-outline" onClick={handleClose}>No</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>)
                                })
                                :
                                <h2 style={{ margin: '10px auto', fontWeight: '400' }} >You do not have any favorite ads yet!</h2>
                            }</>
                            :
                            <>{sc}</>
                    }

                </div>
                <div className="container">
                    <hr />
                </div>
                <div className="mt-5">
                    {
                        this.state.isDataLoaded
                            ?
                            <h5> Total Ads : {this.state.ads.length}</h5>
                            :
                            <div>
                                <Skeleton height={25} width={300} />
                            </div>
                    }
                </div>




            </div>

        );

    }
}
const mapStateToProps = (store) => {
    return {
        ads: store.adsReducer
    }
}
export default connect(mapStateToProps)(FavAds);

// export default MyAds
