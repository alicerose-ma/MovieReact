import React, { memo } from 'react';
import { connect } from 'react-redux'
import { MOVIE_TYPE } from '../../commons/types'
import ListComponent from '../../components/ListComponent';
import CustomHeader from '../../components/CustomHeader';
import CustomStatusBar from '../../components/CustomStatusBar';

const WatchlistScreen = (props) => {
  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader
        title="Watchlist"
        leftButtonName="bars"
        rightButtonName="search"
      />
      <ListComponent
        availableNetwork={props.availableNetwork}
        type={MOVIE_TYPE.WATCH_LIST_MOVIE}
        sessionId={props.sessionId}
        optionalQuery="&sort_by=created_at.desc"
        isLoading={props.isLoading}
        renderListType={props.renderWatchlist}
        name="Watchlist"
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.root.isLoading,
    availableNetwork: state.root.availableNetwork,
    sessionId: state.root.sessionId,
    renderWatchlist: state.movie.renderWatchlist
  }
}


export default connect(mapStateToProps, null)(memo(WatchlistScreen));


