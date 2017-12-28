import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { action } from '@storybook/addon-actions';
import type { Buff } from '../types';
import { grid, colors } from '../constants';
import ReactTooltip from 'react-tooltip'

const BuffItem = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export default class BuffRow extends Component<Props, State> {
  /* eslint-disable react/sort-comp */
  constructor(props) {
    super(props);
    this.state = {
      buffs: this.props.initial.buffs,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      buffs: nextProps.initial.buffs,
    });
  }

  render() {
    const { buffs } = this.state;

    var buffsRow = {
      backgroundColor: 'Beige',
      minHeight: '60px',
      padding: "10px",
    };

     return (
       <div className="row" style={buffsRow}>
        {buffs.map((buff: Buff) => (
          <div key={buff.id} className='col-1'>
          <BuffItem
            key={buff.id}
            buffName={buff.name}
            src={buff.buffIconUrl}
            data-tip
            data-for={buff.id}
          />
          <ReactTooltip id={buff.id} type='warning' effect='float'>
            <span>{buff.buffDesc}</span><br/>
            <span>Effect: {buff.buffTypeText} => {buff.buffValueText}</span>
          </ReactTooltip>
          </div>
        ))}
       </div>
    );
  }
}
