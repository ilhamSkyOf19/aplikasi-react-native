import { DataKeuangan, SelectedType } from '@/interface/type';
import React from 'react';
import { Animated } from 'react-native';
import CardSetoran from '../components/cardComponent/CardSetoran';


export const renderSetoran = (selected: SelectedType, scrollY: Animated.Value) => ({ item, index }: { item: DataKeuangan, index: number }) => (
    <CardSetoran
        id={String(item?.id)}
        img={item.img}
        target={item.target}
        targetSetoran={item.targetSetoran}
        tabungan={item.tabungan}
        nama={item.nama}
        currency={item.idCurrency}
        type={selected}
        scrollY={scrollY}
        index={index}
    />
);
