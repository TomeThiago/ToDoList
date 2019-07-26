import { createSwitchNavigator } from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';
import Task from '../screens/Task';

const AppNavigator = createSwitchNavigator(
    {
			AuthScreen: AuthScreen,
			Task: Task,
		},
    {
      initialRouteName: 'Task',
    }
);

export default AppNavigator;