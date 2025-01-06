import Colors from '@/src/theme/Colors'

export const styles: any = {
  primary: {
    height: 43,
    padding: '12px 34px',
    borderRadius: '50px',
    backgroundColor: Colors.mainBlue,
    color: Colors.white,
    fontSize: 16,
    onPress: {
      backgroundColor: Colors.mainLightBlue2,
      color: Colors.mainBlue
    }
  },
  secondary: {
    height: 43,
    padding: '12px 34px',
    borderRadius: '50px',
    border: `2px solid ${Colors.mainBlue}`,
    backgroundColor: Colors.white,
    color: Colors.mainBlue,
    fontSize: 16,
    fontWeight: 'bold',
    onPress: {
      backgroundColor: Colors.mainBlue,
      color: Colors.white
    },
    onHover: {
      backgroundColor: Colors.mainBlue,
      color: Colors.white
    }
  },
  warning: {
    height: 43,
    padding: '12px 34px',
    borderRadius: '50px',
    backgroundColor: Colors.red,
    color: Colors.white,
    fontSize: 16,
    onPress: {
      backgroundColor: Colors.red,
      color: Colors.white
    }
  },
  warningSecondary: {
    height: 43,
    padding: '12px 34px',
    borderRadius: '50px',
    backgroundColor: 'transparent',
    color: Colors.red,
    fontSize: 16
  },
  secondaryNoBg: {
    height: 43,
    paddingVertical: 16,
    paddingHorizontal: 34,
    backgroundColor: 'transparent',
    color: Colors.mainBlue,
    fontSize: 16,
    fontWeight: 'bold',
    onPress: {
      backgroundColor: Colors.mainBlue,
      color: Colors.white
    }
  }
}
