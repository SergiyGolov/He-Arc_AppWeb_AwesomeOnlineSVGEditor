<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(\Illuminate\Http\Request $request, $user)
    {
        if ($request->ajax()){
            return response()->json([
                'auth' => auth()->check(),
                'user' => $user,
                'intended' => URL::previous(),
            ]);
        }
    }

    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);
        if($request->ajax()){
            // If request from AJAX
            return response()->json([
                'auth' => auth()->check(),
                'user' => $user,
                'intended' => URL::previous(),
            ]);
        } else {
            // Normal POST do redirect
            $request->session()->regenerate();
            return $this->authenticated($request, $this->guard()->user())
                ?: redirect()->intended($this->redirectPath());
        }
    }
}
