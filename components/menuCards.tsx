// components/menuCards.tsx

import { useState } from "react";
import { TouchableOpacity, View, Image, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import { pageThemes } from "./theme";
import common from './styles/commonStyles';
import { PageBase, TabItems } from "./pageContent";
import { TabContent } from "./pageContent";
import React from "react";
import BackButton from "./BackButton";

export default function MenuCards({ page }) {
    const { ACTIVE_COLOR, SECONDARY_COLOR } = pageThemes[page] || {};
    const [focussedTab, setFocussedTab] = useState<FocussedTab>('INDEX');
    const TAB_ITEMS = TabItems({ page });

    return (
        <View style={[common.backgroundBase,
                { backgroundColor: focussedTab === 'INDEX' ? ACTIVE_COLOR : 'transparent' }
        ]}>
            {focussedTab === 'INDEX' ? (
                <View style={[common.content, {borderColor: SECONDARY_COLOR}]}>
                    {/* <BackButton /> */}
                    <PageBase page={page} focussedTab={focussedTab} setFocussedTab={setFocussedTab}></PageBase>
                </View>
            ) : (
                <>
                    {/* <Image style={ common.backgroundImage } source={require('@/assets/images/BackgroundCircles.png')} /> */}
                    <View style={[common.banner, {backgroundColor: ACTIVE_COLOR, borderBottomStartRadius: 10, borderBottomEndRadius: 10}]}>
                        <ThemedText type="title" style={{color: '#fff'}}>{page}</ThemedText>
                        <Pressable onPress={() => {setFocussedTab('INDEX')}}>
                            <Image source={require('@/assets/images/back_icon.png')} style={{ width: 40, height: 40 }} />
                        </Pressable>
                    </View>
                    <View style={[common.content, {borderWidth: 0}]}>
                        <TabContent page={page} focussedTab={focussedTab}></TabContent>
                    </View>

                    <View style={[common.navbar, {backgroundColor: ACTIVE_COLOR}]}>
                        <View style={ common.tabContainer }>
                            {TAB_ITEMS.map(({ id, label}) => {
                                const isActive = focussedTab === id;

                                return (
                                    <TouchableOpacity key={id} onPress={() => setFocussedTab(id)} style={[isActive && [common.activeTab, {backgroundColor: SECONDARY_COLOR}]]}>
                                        <ThemedText type="subtitle" style={common.tab}>{label}</ThemedText>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}