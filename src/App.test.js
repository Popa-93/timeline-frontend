import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('<App/>', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<App />)
  })
  test('contains a filter list', () => {
    const wrapper = shallow(<App />)
  })
  test('contains a timeline', () => {
      
  })
})