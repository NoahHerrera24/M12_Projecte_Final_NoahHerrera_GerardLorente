<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Restablecer Contraseña</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/reset-password.css') }}">
</head>
<body>
    <div class="reset-container">
        <div class="title-container">
            <h2>Restablecer Contraseña</h2>
        </div>
        <form method="POST" action="{{ route('password.store') }}" class="form-container">
            @csrf

            <!-- Password Reset Token -->
            <input type="hidden" name="token" value="{{ $request->route('token') }}">

            <!-- Email Address -->
            <div class="form-group">
                <label for="email">Correo Electrónico:</label>
                <input id="email" class="form-control neon-input" type="email" name="email" value="{{ old('email', $request->email) }}" required autofocus autocomplete="username">
                @error('email')
                    <span class="error-message">{{ $message }}</span>
                @enderror
            </div>

            <!-- Password -->
            <div class="form-group">
                <label for="password">Nueva Contraseña:</label>
                <input id="password" class="form-control neon-input" type="password" name="password" required autocomplete="new-password">
                @error('password')
                    <span class="error-message">{{ $message }}</span>
                @enderror
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
                <label for="password_confirmation">Confirmar Contraseña:</label>
                <input id="password_confirmation" class="form-control neon-input" type="password" name="password_confirmation" required autocomplete="new-password">
                @error('password_confirmation')
                    <span class="error-message">{{ $message }}</span>
                @enderror
            </div>

            <button type="submit" class="btn neon-button">Restablecer Contraseña</button>
        </form>
    </div>
</body>
</html>
