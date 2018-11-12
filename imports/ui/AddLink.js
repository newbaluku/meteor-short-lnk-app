import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { url } = this.state;

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      }
      else {
        this.setState({ error: err.reason });
      }
    });
  }

  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }

  handleModalClose() {
    this.setState({
      url: '',
      isOpen: false,
      error: ''
    });
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => { this.setState({ isOpen: true }) }}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => { this.refs.url.focus() }} // to setup the focus to input. Alternatively, set autoFocus to input
          onRequestClose={this.handleModalClose.bind(this)}
          appElement={document.getElementById('app')} // to get rid of Warning: react-modal: App element is not defined.
          className="boxed-view__box" // apply our class to the modal content
          overlayClassName="boxed-view boxed-view--modal" // apply our class to the modal overlay
          >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)} />
            <button className="button">Add Link</button>
            {/* specify type=button to tell form that clicking this button will not submit the form even
            though it's inside the form */}
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
};