/**
 * Created by 孟庆东 on 2017/7/20.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Animated,
} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, action, autorun} from 'mobx';

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


    minOpacity = 0;
    animationDuration = 200;
    minScale = 0.4;
    defaultOpacity = 1;
    defaultScale = 1;
    defaultOffset = 0;

    opacity = new Animated.Value(this.defaultOpacity);
    scale = new Animated.Value(this.defaultScale);
    offset = new Animated.Value(this.defaultOffset);
    componentHeight = 0;

    @action
    show = (component, options) => {
        this.visible = true;
        this.component = component;
        this.animationType = (options && options.animationType) || 'fade';
        this.transparent = (options && options.transparent) || true;
        this.position = (options && options.position) || this.POSITION.CENTER;
        this.componentHeight = options && options.componentHeight;
        if (this.position == this.POSITION.CENTER) {
            this.centerIn();
        } else if (this.position == this.POSITION.BOTTOM) {
            this.bottomIn();
        }else if (this.position == this.POSITION.TOP) {
            this.topIn();
        }
    }
    @action
    hide = () => {
        if (this.position == this.POSITION.CENTER) {
            this.centerOut();
        } else if (this.position == this.POSITION.BOTTOM) {
            this.bottomOut();
        } else if (this.position == this.POSITION.TOP) {
            this.topOut();
        }else {
            this.visible = false;
        }

    }

    centerIn = () => {
        this.opacity.setValue(this.minOpacity);
        this.scale.setValue(this.minScale);
        Animated.timing(
            this.opacity,
            {
                toValue: 1,
                duration: this.animationDuration
            }
        ).start();

        Animated.spring(
            this.scale,
            {
                toValue: 1,
                tension: 40
            }
        ).start();
    }

    centerOut = () => {
        Animated.timing(
            this.opacity,
            {
                toValue: this.minOpacity,
                duration: this.animationDuration
            }
        ).start(() => {
            this.visible = false;
        });

        Animated.spring(
            this.scale,
            {
                toValue: this.minScale,
                tension: 40
            }
        ).start(() => {
            this.opacity.setValue(this.defaultOpacity);
            this.scale.setValue(this.defaultScale);
        });
    }

    bottomIn = () => {
        if (this.componentHeight) {
            this.offset.setValue(this.componentHeight);
            Animated.spring(
                this.offset,
                {
                    toValue: this.defaultOffset,
                    tension: 40
                }
            ).start(() => {

            });
        }
    }

    bottomOut = () => {
        if (!this.componentHeight) {
            this.visible = false;
        } else {
            Animated.timing(
                this.offset,
                {
                    toValue: this.componentHeight,
                    duration: this.animationDuration
                }
            ).start(() => {
                this.visible = false;
                this.offset.setValue(this.defaultOffset);
                this.componentHeight = undefined;
            });
        }
    }

    topIn = () => {
        if (this.componentHeight) {
            this.offset.setValue(-this.componentHeight);
            Animated.spring(
                this.offset,
                {
                    toValue: this.defaultOffset,
                    tension: 40
                }
            ).start(() => {

            });
        }
    }

    topOut = () => {
        if (!this.componentHeight) {
            this.visible = false;
        } else {
            Animated.timing(
                this.offset,
                {
                    toValue: -this.componentHeight,
                    duration: this.animationDuration
                }
            ).start(() => {
                this.visible = false;
                this.offset.setValue(this.defaultOffset);
                this.componentHeight = undefined;
            });
        }
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
        const {opacity, scale, offset} = XModal;

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
                    <Animated.View style={[{opacity, transform: [{scale}, {translateY: offset}]}]}>
                        {XModal.component}
                    </Animated.View>
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
