import React from 'react'

const Signup = () => {
    return (
        <div className='w-100 h-100 d-flex align-items-center'>
            <div className='w-100 rounded-2 bg-success p-1'>
                <h3>Signup</h3>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="firstname" class="col-form-label">First Name</label>
                    </div>
                    <div class="col-auto">
                        <input type="text" id="firstname" class="form-control" />
                    </div>
                </div>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="lastname" class="col-form-label">Last Name</label>
                    </div>
                    <div class="col-auto">
                        <input type="text" id="lastname" class="form-control" />
                    </div>
                </div>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="email" class="col-form-label">Email</label>
                    </div>
                    <div class="col-auto">
                        <input type="email" id="email" class="form-control" />
                    </div>
                </div>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="password" class="col-form-label">Password</label>
                    </div>
                    <div class="col-auto">
                        <input type="password" id="password" class="form-control" />
                    </div>
                </div>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="cpassword" class="col-form-label">Confirm Password</label>
                    </div>
                    <div class="col-auto">
                        <input type="password" id="cpassword" class="form-control" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Signup
