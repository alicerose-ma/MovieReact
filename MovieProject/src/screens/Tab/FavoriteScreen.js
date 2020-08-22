import React, { memo } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import { MOVIE_TYPE } from '../../commons/types'
import ListComponent from '../../components/ListComponent';
import CustomHeader from '../../components/CustomHeader';
import CustomStatusBar from '../../components/CustomStatusBar';

const FavoriteScreen = (props) => {
  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" />
      <CustomHeader
        title="Favorite"
        leftButtonName="bars"
        rightButtonName="search"
      />
      <ListComponent
        availableNetwork={props.availableNetwork}
        type={MOVIE_TYPE.FAVORITE_MOVIE}
        sessionId={props.sessionId}
        optionalQuery="&sort_by=created_at.desc"
        isLoading={props.isLoading}
        renderListType={props.renderFavorite}
        name="Favorite"
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.root.isLoading,
    availableNetwork: state.root.availableNetwork,
    sessionId: state.root.sessionId,
    renderFavorite: state.movie.renderFavorite,
  }
}


export default connect(mapStateToProps, null)(memo(FavoriteScreen));
