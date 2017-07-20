/**
 * Created by 孟庆东 on 2017/7/20.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action} from 'mobx';

class XModalMobx {

    POSITION = {
        TOP: 1,
        CENTER: 2,
        BOTTOM: 3,
    };

    @observable
    visible = false;

    @observable
    component;

    @observable
    animationType;

    @observable
    transparent = true;

    @observable
    position;

    @action
    show = (component, options) => {
        this.visible = true;
        this.component = component;
        this.animationType = (options && options.animationType) || 'fade';
        this.transparent = (options && options.transparent) || true;
        this.position = (options && options.position) || this.POSITION.CENTER;
    }
    @action
    hide = () => {
        this.visible = false;
    }
}

export default XModal = new XModalMobx();

@observer
export class ModalContainer extends Component {

    generateStyls() {
        if (XModal.position == XModal.POSITION.CENTER) {
            return styles.container;
        } else if (XModal.position == XModal.POSITION.TOP) {
            return [styles.container, styles.top];
        } else if (XModal.position == XModal.POSITION.BOTTOM) {
            return [styles.container, styles.bottom];
        }

    }

    render() {
        var props = Object.assign({}, this.props);
        props.style = this.generateStyls();
        return (
            <Modal
                animationType={XModal.animationType}
                transparent={XModal.transparent}
                onRequestClose={() => {
                }}
                visible={XModal.visible}>

                <View style={props.style}>
                    {XModal.component}
                </View>

            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        justifyContent: 'flex-start',
    },
    bottom: {
        justifyContent: 'flex-end',
    },
})
