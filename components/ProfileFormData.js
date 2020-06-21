import * as React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

export default ProfileFormData = props => {
    const list = [
        {
            title: 'Data de nascimento',
            icon: {
                name: 'calendar',
                type: 'feather'
            }
        },
        {
            title: 'Email',
            icon: {
                name: 'mail',
                type: 'feather'
            }
        },
        {
            title: 'Celular',
            icon: {
                name: 'smartphone',
                type: 'feather'
            }
        },
        {
            title: 'Alterar Senha',
            icon: {
                name: 'lock',
                type: 'simple-line-icon'
            }
        },
        {
            title: 'Configurações',
            icon: {
                name: 'settings',
                type: 'feather'
            }
        },
    ]

    return (
        <View>
            {
                list.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.title}
                        leftIcon={item.icon}
                        rightTitle={"teste"}
                        chevron
                    />
                ))
            }
        </View>
    )
}