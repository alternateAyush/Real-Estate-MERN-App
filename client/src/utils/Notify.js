import { toast } from 'react-toastify';

export const notify = (message,type) =>{
    if(type=='info'){
        return toast.info(message,{autoClose:2000});
    }
    else if(type=='success'){
        return toast.success(message,{autoClose:2000});
    }
    else if(type=='error'){
        return toast.error(message,{autoClose:2000});
    }
    else if(type=='warning'){
        return toast.warning(message,{autoClose:2000});
    }else{
        return toast(message,{autoClose:2000});
    }
}
