import React, { Component } from 'react'
// import { Link } from "react-router-dom"
// import { connect } from 'react-redux'
// import About from './about';

class Chat extends Component {

    state = {
       
    }
    

    render() {
        console.log(this.state)
        console.log(this.props)

        return (
            <div className="main-login">
               This is chat
            </div>
        );
    }
}
// const mapStateToProps = (store) => {
//     return {
//         user: store.userReducer
//     }
// }
// export default connect(mapStateToProps)(Chat);
export default Chat;