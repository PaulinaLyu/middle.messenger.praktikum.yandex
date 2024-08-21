export const validation = (name: string, value: string) => {
  switch (name) {
    case "login": {
      const pattern = /^(?=.*[a-zA-Z])([a-zA-Z0-9_-]{3,20})$/;

      if (pattern.test(value)) {
        return true;
      } else {
        return false;
      }
    }

    case "password": {
      const minLength = 8;
      const maxLength = 40;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasDigit = /\d/.test(value);

      if (value.length < minLength || value.length > maxLength) {
        return false;
      }

      if (!hasUpperCase) {
        return false;
      }

      if (!hasDigit) {
        return false;
      }

      return true;
    }

    case "name": {
      const pattern = /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/;
      return pattern.test(name);
    }

    case "email": {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return pattern.test(value);
    }

    case "phone": {
      const pattern = /^\+?\d{10,15}$/;
      return pattern.test(value);
    }

    case "not_empty": {
      const pattern = /^.+$/;
      return pattern.test(value.trim());
    }

    default:
      return false;
  }
};
