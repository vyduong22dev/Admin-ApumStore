import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { connect } from "react-redux";
import { SketchPicker } from 'react-color';
// @Actions
import ColorActions from "../../redux/actions/color";

class ColorDetail extends Component {
  constructor(props){
    super(props);
    const {color} = props;
    this.state = {
      id: color ? color.id : '',
      nameVn: color ? color.nameVn : '',
      nameEn: color ? color.nameEn : '',
      code: color ? color.code : '#fff',
    }
  }
  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]: value
    })
  }

  onSubmit = () =>{
    const {id, nameVn, nameEn, code} = this.state;
    const {onUpdate, onCreate, queryParams} = this.props;
    var data = {nameVn, nameEn, code}
    if (id) {
      onUpdate(id, data, queryParams);
    }
    else {
      // 4. Create data
      onCreate(data, queryParams);
    }
  }

  handleChangeComplete = (color) => {
    this.setState({ code: color.hex });
  };

	render() {
    const {nameVn, nameEn , code} = this.state;
    const { large, onClose, color} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{color ? "Sửa thông tin màu" : "Thêm màu mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
        <div className="row">
						<div className="col-12 col-lg-6">
							<form>
								<div className="form-group">
									<label>Tên màu:</label>
                  <input type="text" className="form-control" name="nameVn" value={nameVn} onChange={this.onChange}/>
								</div>
                <div className="form-group">
									<label>Tên tiếng anh:</label>
                  <input type="text" className="form-control" name="nameEn" value={nameEn} onChange={this.onChange}/>
								</div>

              </form>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group">
                <label>Chọn màu:</label>
                <SketchPicker
                  color={ code }
                  onChangeComplete={ this.handleChangeComplete }
                />
              </div>
            </div>
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton color="primary" onClick={() => this.onSubmit(!large)}>
						Save
					</CButton>{' '}
					<CButton color="secondary" onClick={() => onClose(!large)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>
		);
	}
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: (data, params) =>{
      dispatch(ColorActions.onCreate(data, params))
    },
    onUpdate: (id, data, params) =>{
      dispatch(ColorActions.onUpdate(id, data, params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorDetail);
