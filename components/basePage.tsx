import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { pageThemes } from "./theme";
import common from './styles/commonStyles';
import { PageBase, TabItems } from "./pageContent";
import React from "react";

export function BasePage({ page, focussedTab, setFocussedTab }) {
    const { ACTIVE_COLOR, SECONDARY_COLOR } = pageThemes[page] || {};
    // const TAB_ITEMS = TabItems({ page });

    return (
        <>
            <View style={ common.banner }>
                <ThemedText type="title" style={{color: '#fff'}}>{page}</ThemedText>
            </View>

            {/* {TabItems({page}).slice(1).map(({ id, label }) => ( */}
            {TabItems({page}).map(({ id, label }) => (
                <TouchableOpacity key={id} onPress={() => setFocussedTab(id)}>
                <View style={[common.card, {borderColor: SECONDARY_COLOR}]}>
                    <ThemedText type="card">{label}</ThemedText>
                </View>
            </TouchableOpacity>
            ))}
        </>
    )
}