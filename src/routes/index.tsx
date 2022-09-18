// dependencies
import { NavigationContainer } from '@react-navigation/native'

// navigation strategy
import { AppRoutes } from './app.routes'

export function Routes() {
  return(
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}