import React, { Component } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
// import { fetchTextEditor } from './API'

class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      displaySetTextErrorMsg: true,
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState(
      {
        editorState,
      },
      () => {
        if (this.props.onEditorStateChange && this.props.id) {
          this.callBackEditorStateChange();
        }
      }
    );
  };

  callBackEditorStateChange = () => {
    this.props.onEditorStateChange({
      id: this.props.id,
      value: draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      ),
    });
  };

  componentWillReceiveProps(newProps) {
    if (
      newProps.EditorState !== undefined &&
      newProps.EditorState !== null &&
      newProps.EditorState !== this.state.editorState &&
      this.state.displaySetTextErrorMsg === true &&
      this.props.id
    ) {
      // console.log('newProps.EditorState', newProps.EditorState)
      if (this.props.resetEditorStateToUndefined) {
        this.setEditorState(
          newProps.EditorState,
          this.props.resetEditorStateToUndefined
        );
      } else {
        alert(
          "To set TextEditor's Text, you must have to define & pass resetEditorStateToUndefined."
        );
        this.setState({ displaySetTextErrorMsg: false });
      }
    }
  }

  setEditorState = (textInfo, callBackFunction = undefined) => {
    const contentBlock = htmlToDraft(textInfo || "");
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
        contentBlock.entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState }, () => {
        this.callBackEditorStateChange();
        if (callBackFunction && this.props.id) {
          callBackFunction(this.props.id);
        }
      });
    }
  };

  render() {
    const { editorState } = this.state;
    const label =
      this.props.label && this.props.label.length > 0 ? this.props.label : "";
    return (
      <div>
        {label}
        <div style={{ border: "1px solid", padding: "5px" }} id={this.props.id}>
          <Editor
            id={this.props.id}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "remove",
                "history",
              ],
            }}
          />
        </div>
      </div>
    );
  }
}

export default ControlledEditor;
