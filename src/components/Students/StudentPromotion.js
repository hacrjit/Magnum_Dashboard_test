import React, { useState } from 'react';
import './StudentPromotion.css';
import Breadcrumb from '../Breadcrumb';

const Fees = () => {
  const [formData, setFormData] = useState({
    currentSession: '2017-2018',
    promoteSession: '2017-2018',
    fromClass: '',
    toClass: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      currentSession: '2017-2018',
      promoteSession: '2017-2018',
      fromClass: '',
      toClass: ''
    });
  };

  return (
    <div className="promotion-fix">
    <Breadcrumb heading="Students" route="Home > Student Promotion" />

    <div className="promotion-container">
      <h2>Search Student Promotion</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Current Session <span className="required">*</span></label>
            <select
              value={formData.currentSession}
              onChange={(e) => setFormData({...formData, currentSession: e.target.value})}
              required
            >
              <option value="2017-2018">2017-2018</option>
              <option value="2018-2019">2018-2019</option>
              <option value="2019-2020">2019-2020</option>
            </select>
          </div>

          <div className="form-group">
            <label>Promote Session <span className="required">*</span></label>
            <select
              value={formData.promoteSession}
              onChange={(e) => setFormData({...formData, promoteSession: e.target.value})}
              required
            >
              <option value="2017-2018">2017-2018</option>
              <option value="2018-2019">2018-2019</option>
              <option value="2019-2020">2019-2020</option>
            </select>
          </div>

          <div className="form-group">
            <label>Promotion From Class <span className="required">*</span></label>
            <select
              value={formData.fromClass}
              onChange={(e) => setFormData({...formData, fromClass: e.target.value})}
              required
            >
              <option value="">Please Select</option>
              <option value="class1">Class 1</option>
              <option value="class2">Class 2</option>
              <option value="class3">Class 3</option>
            </select>
          </div>

          <div className="form-group">
            <label>Promotion To Class <span className="required">*</span></label>
            <select
              value={formData.toClass}
              onChange={(e) => setFormData({...formData, toClass: e.target.value})}
              required
            >
              <option value="">Please Select</option>
              <option value="class2">Class 2</option>
              <option value="class3">Class 3</option>
              <option value="class4">Class 4</option>
            </select>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Fees;